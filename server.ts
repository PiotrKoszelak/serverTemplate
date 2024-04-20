const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`); // update to match the domain you will make the request from
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// Start the server
const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const apiUrl = 'https://api.openai.com/v1/chat/completions';

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            apiUrl,
            {
                messages: [{ role: 'user', content: message }],
                max_tokens: 50,
                temperature: 0.6,
                n: 1,
                model: 'gpt-3.5-turbo',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const botReply = response.data.choices[0].message.content;
        res.send({ reply: botReply });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
});
