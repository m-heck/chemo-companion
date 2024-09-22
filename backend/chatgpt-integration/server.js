require("dotenv").config();
const express = require("express");
const axios = require("axios");
const config = require("./config"); // Make sure this file contains your OpenAI API key

const app = express();
const port = 3000;

app.use(express.json()); // This allows the server to parse JSON bodies
app.use(express.static("public")); // Serves your HTML file if it’s in the 'public' folder

// Define the /chat POST route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;  // Extracts the message from the request body

    // Send the message to OpenAI API using Axios
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",  // Replace with the correct model name
        messages: [{ role: "user", content: message }],  // Passes the user message to the API
        max_tokens: 150,  // Limits the response length
      },
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,  // Passes the API key in the header
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the reply from the API response
    const reply = response.data.choices && response.data.choices[0]?.message?.content?.trim();

    // Send the reply back to the client (frontend)
    if (reply) {
      res.json({ reply });
    } else {
      res.status(500).json({
        error: "No reply from the API",
        detailedMessage: "OpenAI API did not return a valid response.",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    }

    // Handle errors by sending a descriptive message to the client
    res
      .status(error.response?.status || 500)
      .json({
        error: "Internal Server Error",
        detailedMessage: error.message,
      });
  }
});

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
