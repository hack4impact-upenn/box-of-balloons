/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { isAdmin } from '../controllers/admin.middleware.ts';
import {
  toggleRequest,
  getAllChapters,
  createChapter,
  deleteChapter,
  getChapterById,
} from '../controllers/chapter.controller.ts';
import { isAuthenticated } from '../controllers/auth.middleware.ts';
import 'dotenv/config';

const router = express.Router();

router.put('/toggleRequests/:id', isAuthenticated, isAdmin, toggleRequest);

router.get('/all', isAuthenticated, isAdmin, getAllChapters);

router.get('/query/:id', isAuthenticated, isAdmin, getChapterById);

router.post('/create/', isAuthenticated, isAdmin, createChapter);

router.delete('/delete/:id', isAuthenticated, isAdmin, deleteChapter);

export default router;
