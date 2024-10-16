require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // This allows the server to parse JSON bodies
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.send("Chatbot API is running!"); // Simple response for the root URL
});

// Mayo Clinic Scraper (Internal Processing Only)
async function scrapeMayoClinic(query) {
  try {
    const url = `https://www.mayoclinic.org/search/search-results?q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const mayoData = [];
    $('.search-results-item').slice(0, 2).each((index, element) => {
      const summary = $(element).find('.content p').text();
      mayoData.push(summary.trim());
    });

    return mayoData.join(' '); // Return combined text as a useful summary
  } catch (error) {
    console.error("Error scraping Mayo Clinic:", error.message);
    return '';
  }
}

// American Cancer Society Scraper (Internal Processing Only)
async function scrapeCancerSociety(query) {
  try {
    const url = `https://www.cancer.org/search.html?query=${encodeURIComponent(query)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const cancerData = [];
    $('.search-results-item').slice(0, 2).each((index, element) => {
      const summary = $(element).find('.result-body p').text();
      cancerData.push(summary.trim());
    });

    return cancerData.join(' '); // Return combined text as a useful summary
  } catch (error) {
    console.error("Error scraping American Cancer Society:", error.message);
    return '';
  }
}

// Google Scholar Scraper (Internal Processing Only)
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

    return scholarData.join(' ');
  } catch (error) {
    console.error("Error scraping Google Scholar:", error.message);
    return '';
  }
}

// /chat POST route (User-Facing)
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body; // Extracts the message from the request body

    // Fetch the summary from all sources
    const [mayoSummary, cancerSummary, scholarSummary] = await Promise.all([
      scrapeMayoClinic(message),
      scrapeCancerSociety(message),
      scrapeGoogleScholar(message)
    ]);

    // Combine the information to form a helpful response
    const combinedResponse = `
      Here are some insights to help manage your symptoms and recognize critical issues after chemotherapy:

      - Mayo Clinic Insights: ${mayoSummary || 'No specific information found.'}
      - Cancer Society Recommendations: ${cancerSummary || 'No specific information found.'}
      - Research Highlights: ${scholarSummary || 'No specific information found.'}
    `;

    // Send the combined response back to the patient
    res.json({ reply: combinedResponse.trim() });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error", detailedMessage: error.message });
  }
});

// Start the server on port 3001
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
