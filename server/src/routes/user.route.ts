/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { isAdmin } from '../controllers/admin.middleware.ts';
import { toggleRequest } from '../controllers/user.controller.ts';
import { isAuthenticated } from '../controllers/auth.middleware.ts';
import 'dotenv/config';

const router = express.Router();

router.put('/toggleRequests/:id', isAuthenticated, isAdmin, toggleRequest);

export default router;
