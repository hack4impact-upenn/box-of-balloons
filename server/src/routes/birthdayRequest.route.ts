/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { isAdmin } from '../controllers/admin.middleware.ts';
import {
  getAllRequests,
  updateRequestStatus,
  deleteRequest,
  createRequest,
} from '../controllers/birthdayRequest.controller.ts';
import { isAuthenticated } from '../controllers/auth.middleware.ts';
import 'dotenv/config';

const router = express.Router();

router.get('/all/:id', isAuthenticated, isAdmin, getAllRequests);

router.put('/updatestatus/:id', isAuthenticated, isAdmin, updateRequestStatus);

router.delete('/deleterequest/:id', isAuthenticated, isAdmin, deleteRequest);

router.post('/createrequest', createRequest);
// isAuthenticated, isAdmin,
export default router;
