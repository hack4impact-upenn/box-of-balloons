import express from 'express';
import ApiError from '../util/apiError';
import { getUserByEmail } from '../services/user.service';
import StatusCode from '../util/statusCode';
import { getRequestsByChapter } from '../services/birthdayRequest.service';

const getChapterRequests = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { user_email } = req.params;
  const user = await getUserByEmail(user_email);
  const userId = user?.id;

  if (!userId) {
    next(ApiError.missingFields(['user_id']));
    return;
  }

  try {
    const requests = await getRequestsByChapter(userId);
    res.status(StatusCode.OK).json(requests);
  } catch (err) {
    next(ApiError.internal("Unable to retrieve a user's birthday requests"));
  }
};

export { getChapterRequests };
