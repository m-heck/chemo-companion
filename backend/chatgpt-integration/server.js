require('dotenv').config();
const express = require('express');
const axios = require('axios');
const config = require('./config'); // Ensure this path is correct based on your project structure

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Debugging: log the API Key and Message
        console.log("API Key: ", config.apiKey);
        console.log("Message: ", message);

        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'gpt-4o-mini',   // Make sure the model is still available and correct
                prompt: message,
                max_tokens: 150,
            },
            {
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error:', error.message);

        // Detailed error reporting
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Data:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
        }
        
        // Respond with the HTTP status code from the error received from axios if available
        res.status(error.response && error.response.status ? error.response.status : 500).json({
            error: 'Internal Server Error',
            detailedMessage: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});