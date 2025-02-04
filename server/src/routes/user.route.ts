/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { isAdmin } from '../controllers/admin.middleware.ts';
import {
  toggleRequest,
  getActiveUserCount,
  getAcceptingRequestsUserCount,
  getUser,
  getUsersByStateHandler,
} from '../controllers/user.controller.ts';
import { isAuthenticated } from '../controllers/auth.middleware.ts';
import 'dotenv/config';

const router = express.Router();

router.put('/toggleRequests/:id', isAuthenticated, toggleRequest);

router.get('/activeUserCount', isAuthenticated, isAdmin, getActiveUserCount);

router.get(
  '/acceptingRequestsUserCount',
  isAuthenticated,
  isAdmin,
  getAcceptingRequestsUserCount,
);

router.get('/query/:id', isAuthenticated, getUser);

router.get('/state/:state', getUsersByStateHandler);

export default router;
