import axios from 'axios';
import { getBotResponse } from '../../../src/services/chat';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const expectedReply = 'test';

beforeEach(() => {
    mockedAxios.post.mockImplementation(() =>
        Promise.resolve({
            data: { choices: [{ message: { content: expectedReply } }] },
        })
    );
});

describe('getBotResponse', function () {
    test('Correct', async () => {
        const response = await getBotResponse('Hello');
        expect(response).toEqual(expectedReply);
    });

    test('Request issue', async () => {
        mockedAxios.post.mockImplementation(() => Promise.reject({}));
        const response = await getBotResponse('Hello');
        expect(response).toEqual('Ops, something went wrong');
    });
});
