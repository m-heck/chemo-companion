require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database setup
const dbPath = path.resolve(__dirname, 'TeamMonkeyDB.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Root route
app.get("/", (req, res) => {
  res.send("Chatbot API is running!");
});

app.post("/", (req, res) => {

});

app.get("/signup", (req, res) => {
  
});
app.post("/signup",(req,res) =>{
  const {firstName, lastName, email, password, healthcareProvider} = req.body;


  const insertUser = 'INSERT INTO patient (first, last, email, password, provider,bday,gender,treatment,allergy, comorbid, doctorinfo, medication) VALUES (?, ?, ?, ?, ?, null, null, null, null, null, null, null)';
  db.run(insertUser, [firstName, lastName, email, password, healthcareProvider], (err) => {
    if (err) {
      if(err.code === 'SQLITE_CONSTRAINT') {
        return res.status(409).json({ message: 'Email already exists' });
      }
      console.error('Database error:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    return res.status(201).json({ message: 'User added successfully' });
  });

});

app.post("/login",(req,res) =>{
  const {email, password} = req.body;


  const queryUser = 'SELECT * FROM patient WHERE email =  ? AND password = ?';
  db.get(queryUser, [email, password], (err,row) => {
    if (err) {
      if(err.code === 'SQLITE_CONSTRAINT') {
        return res.status(409).json({ message: 'error here' });
      }
      console.error('Database error:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    if(!row){
      return res.status(404).json({ message: 'incorrect username or password' });
    }
    return res.status(201).json({ message: 'User added successfully' });
  });

});







async function scrapeMayoClinic(message) {
  console.log("Scraping Mayo Clinic with message:", message);
  try {
    const response = await axios.get(`https://www.mayoclinic.org/search/search-results?q=${encodeURIComponent(message)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);

    // Extract the first search result
    const bestResult = $('.azsearchlink').first();
    const title = bestResult.text().trim();
    const link = bestResult.attr('href');

    if (!link) {
      console.error("No link found for the best result.");
      return 'No specific information found.';
    }

    const fullLink = link.startsWith('http') ? link : `https://www.mayoclinic.org${link}`;

    // Visit the article link to scrape content
    const articleResponse = await axios.get(fullLink, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
      }
    });
    const articlePage = cheerio.load(articleResponse.data);

    // Extract the main content from the article page
    let summary = articlePage('.content').text().trim();

    // Clean up the extracted text
    summary = summary.replace(/\s+/g, ' ').slice(0, 500); // Replace multiple whitespace with a single space and limit to 500 characters

    console.log("Mayo Clinic title:", title);
    console.log("Mayo Clinic summary:", summary);

    return `Title: ${title}\nSummary: ${summary}`;
  } catch (error) {
    console.error("Error scraping Mayo Clinic:", error.message);
    return 'Unable to retrieve information.';
  }
}

// American Cancer Society Scraper
async function scrapeCancerSociety(query) {
  try {
    const url = `https://www.cancer.org/search.html?query=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const cancerData = [];
    // Updated selectors based on the structure of the American Cancer Society website
    $('.search-result').each((index, element) => {
      const title = $(element).find('a').text().trim();
      const summary = $(element).find('.result-body p').text().trim();
      if (title && summary) {
        cancerData.push(`${title}: ${summary}`);
      }
    });

    return cancerData.join(' ') || 'No specific information found.';
  } catch (error) {
    console.error("Error scraping American Cancer Society:", error.message);
    return 'Unable to retrieve information.';
  }
}

// Google Scholar Scraper
async function scrapeGoogleScholar(query) {
  try {
    const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const scholarData = [];
    $('.gs_ri').slice(0, 2).each((index, element) => {
      const snippet = $(element).find('.gs_rs').text();
      scholarData.push(snippet.trim());
    });

    return scholarData.join(' ') || 'No specific information found.';
  } catch (error) {
    console.error("Error scraping Google Scholar:", error.message);
    return 'Unable to retrieve information.';
  }
}

async function generateChatGPTResponse(mayoSummary, cancerSummary, scholarSummary) {
  try {
    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant providing advice based on medical and research summaries."
      },
      {
        role: "user",
        content: `
          Based on the following information, provide a personalized and condensed summary of advice for a patient that just got out of chemotherapy:
          
          - Mayo Clinic Insights: ${mayoSummary}
          - Cancer Society Recommendations: ${cancerSummary}
          - Research Highlights: ${scholarSummary}
          
          Please offer the best advice and recommendations for the user based on the above information while being human and professional.
          Make sure that the response is complete and under 200 tokens.
        `
      },
    ];

    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4o-mini", // Ensure this model is available for your account
      messages: messages,
      max_tokens: 200,
      temperature: 0.5
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating ChatGPT response:", error.message);
    return 'Unable to generate a personalized response at this time.';
  }
}

// /chat POST route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const [mayoSummary, cancerSummary, scholarSummary] = await Promise.all([
      scrapeMayoClinic(message),
      scrapeCancerSociety(message),
      scrapeGoogleScholar(message)
    ]);

    // Print summaries to the terminal
    //console.log("Mayo Clinic Summary:", mayoSummary);
    console.log("Cancer Society Summary:", cancerSummary);
    console.log("Google Scholar Summary:", scholarSummary);

    const personalizedAdvice = await generateChatGPTResponse(mayoSummary, cancerSummary, scholarSummary);

    res.json({ reply: personalizedAdvice });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error", detailedMessage: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
