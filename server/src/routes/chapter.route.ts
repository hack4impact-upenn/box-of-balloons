/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { isAdmin } from '../controllers/admin.middleware.ts';
import {
  toggleRequest,
  getAllChapters,
  createChapter,
  deleteChapter,
} from '../controllers/chapter.controller.ts';
import { isAuthenticated } from '../controllers/auth.middleware.ts';
import 'dotenv/config';

const router = express.Router();

router.put('/toggleRequests/:id', isAuthenticated, isAdmin, toggleRequest);

router.get('/all', isAuthenticated, isAdmin, getAllChapters);

router.post('/create/', createChapter);
//, isAuthenticated, isAdmin
router.delete('/delete/:id', deleteChapter);
//, isAuthenticated, isAdmin
export default router;
