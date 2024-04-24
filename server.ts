// Global dependencies
import express from 'express';
import 'dotenv/config';

// Project dependencies
import router from './src/routes/chat';
import { errorHandler } from './src/middlewares/error';

// Express initialization
const app = express();

// Middlewares
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

// Routes
app.use('/chat', router);

// Error handling
app.use(errorHandler);
