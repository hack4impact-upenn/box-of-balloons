/* eslint-disable import/prefer-default-export */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import {
  toggleRequestByID,
  countActiveUsers,
  countAcceptingRequestsUsers
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

export { toggleRequest, getActiveUserCount, getAcceptingRequestsUserCount };
