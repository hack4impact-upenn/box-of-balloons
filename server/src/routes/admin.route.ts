/**
 * Specifies the middleware and controller functions to call for each route
 * relating to admin users.
 */
import express from 'express';
import { isAdmin } from '../controllers/admin.middleware.ts';
import {
  getAllUsers,
  upgradePrivilege,
  deleteUser,
  inviteUser,
  verifyToken,
  register,
} from '../controllers/admin.controller.ts';
import { isAuthenticated } from '../controllers/auth.middleware.ts';
import { approve } from '../controllers/auth.controller.ts';
import 'dotenv/config';

const router = express.Router();

/**
 * A GET route to get all users. Checks first if the requestor is a
 * authenticated and is an admin.
 */
router.get('/all', isAuthenticated, isAdmin, getAllUsers);

/**
 * A GET route to check if the requestor is an admin. Checks first if the
 * requestor is a authenticated. Throws an error if the requestor is not an admin.
 */
router.get('/adminstatus', isAuthenticated, isAdmin, approve);

/**
 * A PUT route to upgrade a user's privilege. Checks first if the requestor
 * is a authenticated and is an admin.
 * Expects a JSON body with the following fields:
 * - email (string) - The email of the user to be promoted
 */
router.put('/promote', isAuthenticated, isAdmin, upgradePrivilege);

/**
 * A PUT route to upgrade a user's privilege
 * Expects a JSON body with the following fields:
 * - email (string) - The email of the user to be promoted
 */
// delete during deployment
router.put('/autopromote', upgradePrivilege);

/**
 * A PUT route to delete a user. Checks first if the requestor
 * is a authenticated and is an admin.
 * Expects the following fields in the URL:
 * email (string) - The email of the user to be deleted
 */
router.delete('/:email', isAuthenticated, isAdmin, deleteUser);

/**
 * A POST route to invite a new user
 * Expects a JSON body with the following fields:
 * - email (string) - The email to invite the user from
 */
router.post('/invite', isAuthenticated, isAdmin, inviteUser);

/**
 * A GET route to verify the user invite is valid
 */
router.get('/invite/:token', verifyToken);

/**
 * A POST route to register a user (can only be done by admin). Expects a JSON body with the following fields:
 * - city (string) - The first name of the user
 * - state (string) - The last name of the user
 * - email (string) - The email of the user
 * - password (string) - The password of the user
 */
router.post('/register', isAuthenticated, isAdmin, register);

export default router;
