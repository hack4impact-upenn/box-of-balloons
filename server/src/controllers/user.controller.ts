/* eslint-disable import/prefer-default-export */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import {
  toggleRequestByID,
  countActiveUsers,
  countAcceptingRequestsUsers,
  getUserById,
  getUsersByState,
} from '../services/user.service.ts';

const toggleRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }

  toggleRequestByID(id)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to toggle status.'));
    });
};

const getActiveUserCount = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const count = await countActiveUsers();
    res.status(StatusCode.OK).json({ activeUserCount: count });
  } catch (e) {
    next(ApiError.internal('Unable to get active user count.'));
  }
};

const getAcceptingRequestsUserCount = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const count = await countAcceptingRequestsUsers();
    res.status(StatusCode.OK).json({ acceptingRequestsUserCount: count });
  } catch (e) {
    next(ApiError.internal('Unable to get accepting requests user count.'));
  }
};

const getUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }

  try {
    const user = await getUserById(id);
    res.status(StatusCode.OK).json(user);
  } catch (e) {
    next(ApiError.internal('Unable to get user.'));
  }
};

const getUsersByStateHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { state } = req.params;
    if (!state) {
      return res.status(400).json({ message: 'State parameter is required' });
    }

    const users = await getUsersByState(state);
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users by state:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  toggleRequest,
  getActiveUserCount,
  getAcceptingRequestsUserCount,
  getUser,
  getUsersByStateHandler
};
