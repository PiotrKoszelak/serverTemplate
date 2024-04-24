import express from 'express';

import { post } from '../controllers/chat';

const router = express.Router();

router.post('/', post);

export default router;
