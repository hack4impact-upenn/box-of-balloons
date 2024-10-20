import express from 'express';
import { createBirthdayRequestHandler } from '../controllers/birthdayRequest.controller.ts';

const router = express.Router();

router.post('/', createBirthdayRequestHandler);

export default router;
