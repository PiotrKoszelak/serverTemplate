import axios from 'axios';

const apiUrl = 'https://api.openai.com/v1/chat/completions';

async function getBotResponse(message: string) {
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

        return response.data.choices[0].message.content;
    } catch (error) {
        return 'Ops, something went wrong';
    }
}

export { getBotResponse };
