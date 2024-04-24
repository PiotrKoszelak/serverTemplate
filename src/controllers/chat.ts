import { NextFunction, Request, Response } from 'express';
import { getBotResponse } from '../services/chat';

async function post(req: Request, res: Response, next: NextFunction) {
    const { message } = req.body;

    try {
        const botReply = await getBotResponse(message);
        res.status(200).send({ reply: botReply });
    } catch (error) {
        next(error);
    }
}

export { post };
