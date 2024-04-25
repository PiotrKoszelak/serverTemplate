import request from 'supertest';
import express from 'express';
import router from '../../../src/routes/chat';
import { getBotResponse } from '../../../src/services/chat';
import { errorHandler } from '../../../src/middlewares/error';

jest.mock('../../../src/services/chat');

const expectedReply = 'Hello, how I can help You ?';

beforeEach(() => {
    (getBotResponse as jest.Mock).mockImplementation(() =>
        Promise.resolve(expectedReply)
    );
});

const app = express();
app.use(express.json());
app.use('/chat', router);
app.use(errorHandler);

describe('Post', function () {
    test('Good response', async () => {
        const res = await request(app).post('/chat').send();
        expect(res.header['content-type']).toBe(
            'application/json; charset=utf-8'
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.reply).toEqual(expectedReply);
    });

    test('Bad response', async () => {
        (getBotResponse as jest.Mock).mockImplementation(() =>
            Promise.reject()
        );
        const res = await request(app).post('/chat').send();
        expect(res.statusCode).toBe(500);
    });
});
