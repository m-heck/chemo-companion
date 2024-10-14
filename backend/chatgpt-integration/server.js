require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // This allows the server to parse JSON bodies
app.use(bodyParser.json);
// Root route
app.get("/", (req, res) => {
  res.send("Chatbot API is running!"); // Simple response for the root URL
});

// Define the /chat POST route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body; // Extracts the message from the request body

    // Send the message to OpenAI API using Axios
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // Ensure you are using the correct model
        messages: [{ role: "user", content: message }],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use your environment variable
          "Content-Type": "application/json",
        },
      }
    );

    // Extract the reply from the API response
    const reply = response.data.choices[0]?.message?.content?.trim();

    // Send the reply back to the client
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
    res
      .status(500)
      .json({ error: "Internal Server Error", detailedMessage: error.message });
  }
});



app.post('/signup', (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;

  if (!firstName || !lastName || !email || !password || !userType) {
      return res.status(400).send('All fields are required.');
  }

  const query = `INSERT INTO users (email, password)
                 VALUES (?, ?)`;

  db.run(query, [firstName, lastName, email, password, userType], function(err) {
      if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
              return res.status(400).send('Email already exists.');
          }
          return res.status(500).send('Failed to add user.');
      }
      res.status(201).send('User added successfully.');
  });
});















// Start the server on port 3001
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
