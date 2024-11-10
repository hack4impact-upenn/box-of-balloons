import express from 'express';
import 'dotenv/config';
import getChapters from '../controllers/chapter.controller.ts';

const router = express.Router();

/**
 * A GET route to get all chapters.
 */
router.get('/', getChapters);

export default router;
