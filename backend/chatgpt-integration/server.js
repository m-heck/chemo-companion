require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

const SECRET_KEY = process.env.SECRET_KEY; // Use the secret key from the environment variable

app.use(cors({
  //origin: 'http://localhost:3000',
  //credentials: true,
}));
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

// JWT blacklist
let tokenBlacklist = [];

// Root route
app.get("/", (req, res) => {
  res.send("Chatbot API is running!");
});

app.post("/", (req, res) => {

});

app.get("/signup", (req, res) => {
  // Signup form or logic
});

// Create a new user (healthcare provider or patient)
app.post("/signup", (req, res) => {
  const { firstName, lastName, email, password, healthcareProvider, userType} = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }

    //Insert patient into database if no errors, fill with null values if no information providied
    const insertUser = 'INSERT INTO patient (first, last, email, password, provider, usertype, bday, gender, treatment, allergy, comorbid, doctorinfo, medication) VALUES (?, ?, ?, ?, ?, ?, null, null, null, null, null, null, null)';
    db.run(insertUser, [firstName, lastName, email, hashedPassword, healthcareProvider, userType], (err) => {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ message: 'Email already exists' });
        }
        console.error('Database error:', err);
        return res.status(500).json({ message: 'An error occurred' });
      }
      return res.status(201).json({ message: 'User added successfully' });
    });
  });
});

//Login by comparing password hash
app.post("/login", (req, res) => {
  const { email, password, userType } = req.body;

  console.log('Login request received for email:', email);

  const findUser = 'SELECT * FROM patient WHERE email = ? AND usertype = ?';
  db.get(findUser, [email,userType], (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('User found:', user);

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'An error occurred' });
      }
      if (!isMatch) {
        console.log('Password does not match for email:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      console.log('Password matches for email:', email);

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ token });
    });
  });
});

// Sign-out route to blacklist the token and invalidate it
app.post('/signout', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  tokenBlacklist.push(token);
  res.status(200).send({ message: 'Signed out successfully' });
});

// Check if token is blacklisted before accessing protected routes
const checkBlacklist = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (tokenBlacklist.includes(token)) {
    return res.status(401).send({ message: 'Token is invalid' });
  }
  next();
};

// Apply the middleware to protected routes
app.use('/protected', checkBlacklist);

// When the user is authenticated, they can access the protected route
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/profile", authenticateToken, (req, res) => {
  const userEmail = req.user.email;

  const getUserProfile = 'SELECT * FROM patient WHERE email = ?';
  db.get(getUserProfile, [userEmail], (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ profile: user });
  });
});

// app.get("/profilelist", authenticateToken, (req, res) => {
//   const userEmail = req.user.email;

//   const getUserProfile = 'SELECT * FROM patient WHERE usertype = ?';
//   db.all(getUserProfile, ['patient'], (err, user) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({ message: 'An error occurred' });
//     }
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ profile: user });
//   });
// });

app.get("/profilelist", authenticateToken, (req, res) => {
  const userEmail = req.user.email;


  // const getprovider = 'SELECT provider FROM patient WHERE email = ?';

  // theprovider = '';
  
  // db.get(getprovider, [userEmail], (err, user) => {
  //   if (err) {
  //     console.error('Database error:', err);
  //     return res.status(500).json({ message: 'An error occurred' });
  //   }
  //   if (!user) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   theprovider = user.provider;
  // });


  const getUserProfile = 'SELECT * FROM patient WHERE usertype = ? AND provider = (SELECT provider FROM patient WHERE email = ?)';
  db.all(getUserProfile, ['patient', userEmail], (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ profile: user });
  });
});

app.get("/getnotifications", authenticateToken, (req, res) => {
  const userEmail = req.user.email;




  const getUserProfile = 'SELECT notification FROM notifications WHERE email IN (SELECT email FROM patient WHERE usertype = ? AND provider = (SELECT provider FROM patient WHERE email = ?))'; 
  db.all(getUserProfile, ['patient', userEmail], (err,user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    res.json({ profile: user });
  });
});

app.post("/makenotification", authenticateToken, (req, res) => {
  const userEmail = req.user.email;

  const {notification} = req.body;


  const makenotification = 'INSERT INTO notifications SELECT email, ? AS notification FROM patient WHERE usertype = ? AND provider = (SELECT provider FROM patient WHERE email = ?)'; 
  db.run(makenotification, [notification, 'patient', userEmail], (err) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    return res.status(201).json({ message: 'notification added' });
  });
});





app.post("/deletenotification", authenticateToken, (req, res) => {
  const userEmail = req.user.email;

  const {notification} = req.body;


  const deletenoti = 'DELETE FROM notifications WHERE email = ? AND notification = ?'; 
  db.run(deletenoti, [userEmail,notification], (err) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    return res.status(201).json({ message: 'notification added' });
  })
});

















// Update a user
app.put("/update-user", authenticateToken, (req, res) => {
  const { first, last, bday, gender, emergencyphone, cancerdetail, treatment, allergy, comorbid, doctorinfo, medication } = req.body;
  const email = req.user.email;

  const updateUser = `
    UPDATE patient
    SET first = ?, last = ?, bday = ?, gender = ?, emergencyphone = ?, cancerdetail = ?, treatment = ?, allergy = ?, comorbid = ?, doctorinfo = ?, medication = ?
    WHERE email = ?
  `;

  db.run(updateUser, [first, last, bday, gender, emergencyphone, cancerdetail, treatment, allergy, comorbid, doctorinfo, medication, email], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'An error occurred' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User updated successfully' });
  });
});



async function scrapeMayoClinic(message,patientData) {
  console.log("Scraping Mayo Clinic with message:", message);
  try {
    const response = await axios.get(`https://www.mayoclinic.org/search/search-results?q=${encodeURIComponent(message)} ${encodeURIComponent(patientData)}`, {
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
async function scrapeCancerSociety(query, patientData) {
  try {
    const url = `https://www.cancer.org/search.html?query=${encodeURIComponent(query)} ${encodeURIComponent(patientData)}`;
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
async function scrapeGoogleScholar(query, patientData) {
  try {
    const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(query)} ${encodeURIComponent(patientData)}`;
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

// Function to get patient data
const getPatientData = (email, callback) => {
  const query = 'SELECT * FROM patient WHERE email = ?';
  db.get(query, [email], (err, row) => {
    if (err) {
      console.error('Failed to retrieve patient data:', err.message);
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};


async function generateChatGPTResponse(patientData, mayoSummary, cancerSummary, scholarSummary, userMessage) {
  try {
    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant providing advice based on medical and research summaries. Be clear and not overwelhming.\
        You are a professional chemotherapist, assisting patients who are undergoing chemotherapy treatments. \
        You should maintain a caring, supportive, and informative tone, focusing on helping the user manage their treatment, side effects, and any concerns related to chemotherapy. \
        Your goal is to guide patients through their chemotherapy journey, while making sure they understand the process, addressing their fears.\
        You will also be given their health data, make sure to provide personalized advice based on their condition and the research results."
      },
      {
        role: "user",
        content: `
          Based on the following information, provide a personalized and condensed summary of advice for a patient that just got out of chemotherapy:
          
          - Patient Name: ${patientData.name}
          - Age: ${patientData.age}
          - Gender: ${patientData.gender}
          - Cancer Type and Stage: ${patientData.cancerTypeStage}
          - Treatment Plan: ${patientData.treatmentPlan}
          
          - Mayo Clinic Insights: ${mayoSummary}
          - Cancer Society Recommendations: ${cancerSummary}
          - Research Highlights: ${scholarSummary}
          
          - User's Message: ${userMessage}
          
          Please offer the best advice and recommendations for the user based on the above information while being human and professional.
          Make the response limited to 250 tokens. 
        `
      },
    ];

    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4o-mini", 
      messages: messages,
      max_tokens: 250,
      temperature: 0.1,
      //Penalty for repeated tokens
      frequency_penalty: 0.1,
      //Penalty for tokens that are present before
      presence_penalty: 0.1,
      //Considers a smaller set of probable outcomes 
      top_p: 0.5
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    //GPT will have multiple responses, choose the first one and remove white space
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating ChatGPT response:", error.message);
    return 'Unable to generate a personalized response at this time.';
  }
}

// /chat POST route
app.post("/chat", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const email = decoded.email;
    const { message } = req.body; 

    getPatientData(email, async (err, patientData) => {
      if (err) {
        return res.status(500).send({ message: 'Failed to retrieve patient data' });
      }

      try {
        const [mayoSummary, cancerSummary, scholarSummary] = await Promise.all([
          scrapeMayoClinic(message, patientData.cancerTypeStage),
          scrapeCancerSociety(message, patientData.cancerTypeStage),
          scrapeGoogleScholar(message, patientData.cancerTypeStage)
        ]);

        // Print summaries to the terminal
        //console.log("Mayo Clinic Summary:", mayoSummary);
        console.log("Cancer Society Summary:", cancerSummary);
        console.log("Google Scholar Summary:", scholarSummary);

        const personalizedAdvice = await generateChatGPTResponse(patientData, mayoSummary, cancerSummary, scholarSummary, message);

        res.json({ reply: personalizedAdvice });
      } catch (error) {
        console.error("Error generating advice:", error.message);
        res.status(500).send({ message: 'Failed to generate advice' });
      }
    });
  } catch (error) {
    console.error("Error in /chat endpoint:", error.message);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;