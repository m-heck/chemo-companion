require("dotenv").config();
const express = require("express");
const axios = require("axios");
const config = require("./config"); // Ensure this path is correct based on your project structure

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // Ensure the model name is correct
        messages: [{ role: "user", content: message }],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Safely access the reply from the response
    const reply =
      response.data.choices &&
      response.data.choices[0]?.message?.content?.trim();

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

    res
      .status(
        error.response && error.response.status ? error.response.status : 500
      )
      .json({
        error: "Internal Server Error",
        detailedMessage: error.message,
      });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
