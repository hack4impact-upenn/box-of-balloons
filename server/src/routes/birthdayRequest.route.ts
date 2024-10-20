import express from 'express';
import 'dotenv/config';
import { getChapterRequests } from '../controllers/birthdayRequest.controller';

const router = express.Router();

/**
 * A GET route to get all birthday requests associated with the chapter
 * Expects the following field in the URL:
 * user_id (number) - The id of the user
 */
router.get('/:user_email', getChapterRequests);

export default router;
