/**
 * Specifies the middleware and controller functions to call for each route
 * relating to authentication.
 */
import express from 'express';
import {
  login,
  logout,
  approve,
  sendResetPasswordEmail,
  resetPassword,
  verifyAccount,
} from '../controllers/auth.controller.ts';
import { isAuthenticated } from '../controllers/auth.middleware.ts';
import 'dotenv/config';

const router = express.Router();

/**
 * A POST route to verify a user's account. Expects a JSON body with the following fields:
 * - token (string) - The token identifying the verification attempt
 */
router.post('/verify-account', verifyAccount);

/**
 * A POST route to log in a user. Expects a JSON body with the following fields:
 * - email (string) - The email of the user
 * - password (string) - The password of the user
 */
router.post('/login', login);

/**
 * A POST route to log out a user.
 */
router.post('/logout', isAuthenticated, logout);

/**
 * A POST route to send a password reset email to a user. Expects a JSON body
 * with the following fields:
 * - email (string) - The email of the user
 */
router.post('/send-reset-password-email', sendResetPasswordEmail);

/**
 * A POST route to reset a user's password. Expects a JSON body with the
 * following fields:
 * - password (string) - The new password of the user
 * - token (string) - The token identifying the reset password attempt
 */
router.post('/reset-password', resetPassword);

/**
 * A GET request to check if a user is an logged in. Utilizes the middleware to
 * check if a user if authenticated. Returns 200 OK if the user is authenticated
 * and 401 unauthorized if the user is not authenticated.
 */
router.get('/authstatus', isAuthenticated, approve);

export default router;
