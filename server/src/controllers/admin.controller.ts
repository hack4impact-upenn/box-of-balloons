/**
 * All the controller functions containing the logic for routes relating to
 * admin users such as getting all users, deleting users and upgrading users.
 */
import express from 'express';
import crypto from 'crypto';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import { IUser } from '../models/user.model.ts';
import {
  upgradeUserToAdmin,
  getUserByEmail,
  getAllUsersFromDB,
  deleteUserById,
  createUser,
} from '../services/user.service.ts';
import {
  createInvite,
  getInviteByEmail,
  getInviteByToken,
  updateInvite,
} from '../services/invite.service.ts';
import { IInvite } from '../models/invite.model.ts';
import {
  emailInviteLink,
  emailVerificationLink,
} from '../services/mail.service.ts';
import mixpanel from '../config/configMixpanel.ts';

/**
 * Get all users from the database. Upon success, send the a list of all users in the res body with 200 OK status code.
 */
const getAllUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return (
    getAllUsersFromDB()
      .then((userList) => {
        res.status(StatusCode.OK).send(userList);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all users'));
      })
  );
};

/**
 * Upgrade a user to an admin. The email of the user is expected to be in the request body.
 * Upon success, return 200 OK status code.
 */
const upgradePrivilege = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email } = req.body;
  if (!email) {
    next(ApiError.missingFields(['email']));
    return;
  }

  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    next(ApiError.notFound(`User with email ${email} does not exist`));
    return;
  }
  if (user.admin) {
    next(ApiError.badRequest(`User is already an admin`));
    return;
  }

  upgradeUserToAdmin(user._id)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to upgrade user to admin.'));
    });
};

/**
 * A controller function to register a user in the database.
 */
const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { city, state, email, password } = req.body;
  if (!city || !(typeof city === 'string')) {
    next(ApiError.notFound(`city does not exist or is invalid`));
    return;
  }
  if (!state || !(typeof state === 'string')) {
    next(ApiError.notFound(`state does not exist or is invalid`));
    return;
  }
  if (!email || !(typeof email === 'string')) {
    next(ApiError.notFound(`email does not exist or is invalid`));
    return;
  }
  if (!password || !(typeof password === 'string')) {
    next(ApiError.notFound(`password does not exist or is invalid`));
    return;
  }
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;

  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/;

  const nameRegex = /^[a-z ,.'-]+/i;

  if (
    !email.match(emailRegex) ||
    !password.match(passwordRegex) ||
    !city.match(nameRegex) ||
    !state.match(nameRegex)
  ) {
    next(ApiError.badRequest('Invalid email, password, or name.'));
    return;
  }

  if (req.isAuthenticated()) {
    next(ApiError.badRequest('Already logged in.'));
    return;
  }
  const lowercaseEmail = email.toLowerCase();
  // Check if user exists
  const existingUser: IUser | null = await getUserByEmail(lowercaseEmail);
  if (existingUser) {
    next(
      ApiError.badRequest(
        `An account with email ${lowercaseEmail} already exists.`,
      ),
    );
    return;
  }

  // Create user and send verification email
  try {
    const user = await createUser(city, state, lowercaseEmail, password);
    // Don't need verification email if testing
    if (process.env.NODE_ENV === 'test') {
      user!.verified = true;
      await user?.save();
    } else {
      const verificationToken = crypto.randomBytes(32).toString('hex');
      user!.verificationToken = verificationToken;
      await user!.save();
      await emailVerificationLink(lowercaseEmail, verificationToken);
    }
    // Mixpanel Register tracking
    mixpanel.track('Register', {
      distinct_id: user?._id,
      email: user?.email,
    });

    res.sendStatus(StatusCode.CREATED);
  } catch (err) {
    next(ApiError.internal('Unable to register user.'));
  }
};

/**
 * Delete a user from the database. The email of the user is expected to be in the request parameter (url). Send a 200 OK status code on success.
 */
const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { email } = req.params;
  if (!email) {
    next(ApiError.missingFields(['email']));
    return;
  }

  // Check if user to delete is an admin
  const user: IUser | null = await getUserByEmail(email);
  if (!user) {
    next(ApiError.notFound(`User with email ${email} does not exist`));
    return;
  }

  const reqUser: IUser | undefined = req.user as IUser;
  if (reqUser.email === user.email) {
    next(ApiError.badRequest('Cannot delete self.'));
    return;
  }
  if (user.admin) {
    next(ApiError.forbidden('Cannot delete an admin.'));
    return;
  }

  deleteUserById(user._id)
    .then(() => res.sendStatus(StatusCode.OK))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Failed to delete user.'));
    });
};

const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { token } = req.params;
  getInviteByToken(token)
    .then((invite) => {
      if (invite) {
        res.status(StatusCode.OK).send(invite);
      } else {
        next(ApiError.notFound('Unable to retrieve invite'));
      }
    })
    .catch(() => {
      next(ApiError.internal('Error retrieving invite'));
    });
};

const inviteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { emails } = req.body;
  if (!emails) {
    next(ApiError.missingFields(['email']));
    return;
  }
  const emailList = emails.replaceAll(' ', '').split(',');
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;

  function validateEmail(email: string) {
    if (!email.match(emailRegex)) {
      next(ApiError.badRequest(`Invalid email: ${email}`));
    }
  }

  function combineEmailToken(email: string, invite: IInvite | null) {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    return [email, invite, verificationToken];
  }

  async function makeInvite(combinedList: any[]) {
    try {
      const email = combinedList[0];
      const existingInvite = combinedList[1];
      const verificationToken = combinedList[2];
      if (existingInvite) {
        await updateInvite(existingInvite, verificationToken);
      } else {
        await createInvite(email, verificationToken);
      }
    } catch (err: any) {
      next(ApiError.internal(`Error creating invite: ${err.message}`));
    }
  }

  function sendInvite(combinedList: any[]) {
    try {
      const email = combinedList[0];
      const verificationToken = combinedList[2];

      emailInviteLink(email, verificationToken);
    } catch (err: any) {
      next(ApiError.internal(`Error sending invite: ${err.message}`));
    }
  }

  try {
    if (emailList.length === 0) {
      next(ApiError.missingFields(['email']));
      return;
    }
    emailList.forEach(validateEmail);
    const lowercaseEmailList: string[] = emailList.map((email: string) =>
      email.toLowerCase(),
    );

    const userPromises = lowercaseEmailList.map(getUserByEmail);
    const existingUserList = await Promise.all(userPromises);

    const invitePromises = lowercaseEmailList.map(getInviteByEmail);
    const existingInviteList = await Promise.all(invitePromises);

    const existingUserEmails = existingUserList.map((user) =>
      user ? user.email : '',
    );
    const existingInviteEmails = existingInviteList.map((invite) =>
      invite ? invite.email : '',
    );

    const emailInviteList = lowercaseEmailList.filter((email) => {
      if (existingUserEmails.includes(email)) {
        throw ApiError.badRequest(`User with email ${email} already exists`);
      }
      return !existingUserEmails.includes(email);
    });

    const combinedList = emailInviteList.map((email) => {
      const existingInvite =
        existingInviteList[existingInviteEmails.indexOf(email)];
      return combineEmailToken(email, existingInvite);
    });

    const makeInvitePromises = combinedList.map(makeInvite);
    await Promise.all(makeInvitePromises);

    const sendInvitePromises = combinedList.map(sendInvite);
    await Promise.all(sendInvitePromises);

    res.sendStatus(StatusCode.CREATED);
  } catch (err: any) {
    next(ApiError.internal(`Unable to invite user: ${err.message}`));
  }
};

export {
  getAllUsers,
  upgradePrivilege,
  register,
  deleteUser,
  verifyToken,
  inviteUser,
};
