/* eslint-disable import/prefer-default-export */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import {
  toggleRequestByID,
  getAllChaptersFromDB,
  deleteChapterByID,
  createChapterByID,
  getChapterByIdFromDB,
} from '../services/chapter.service.ts';
import { IChapter } from '../models/chapter.model.ts';

const getAllChapters = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return (
    getAllChaptersFromDB()
      .then((userList) => {
        res.status(StatusCode.OK).send(userList);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all users'));
      })
  );
};

const getChapterById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }

  getChapterByIdFromDB(id)
    .then((chapter) => {
      if (!chapter) {
        next(ApiError.notFound('Chapter not found'));
        return;
      }
      res.status(StatusCode.OK).send(chapter);
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Unable to retrieve chapter'));
    });
};

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

const deleteChapter = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // request id
  const { id } = req.params;
  if (!id) {
    next(ApiError.missingFields(['id']));
    return;
  }
  // get chapter by chapter ID
  const chapter: IChapter | null = await getChapterByIdFromDB(id);
  if (!chapter) {
    next(ApiError.notFound(`Chapter does not exist`));
    return;
  }

  deleteChapterByID(id)
    .then(() => res.sendStatus(StatusCode.OK))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((e) => {
      next(ApiError.internal('Failed to delete chapter.'));
    });
};

const createChapter = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    city,
    state,
    isAcceptingRequests,
    email,
    password,
    verified,
    verificationToken,
    resetPasswordToken,
    resetPasswordTokenExpiryDate,
    isAdmin,
  } = req.body;
  if (!city || !(typeof city === 'string')) {
    next(ApiError.notFound(`city does not exist or is invalid`));
    return;
  }
  if (!state || !(typeof state === 'string')) {
    next(ApiError.notFound(`state does not exist or is invalid`));
    return;
  }
  if (isAcceptingRequests !== true && isAcceptingRequests !== false) {
    next(ApiError.notFound(`isAcceptingRequests does not exist or is invalid`));
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
  if (verified !== true && verified !== false) {
    next(ApiError.notFound(`verified does not exist or is invalid`));
    return;
  }
  // not sure if this is right, it was chat gpt'ed lol
  if (
    verificationToken !== undefined &&
    verificationToken !== null &&
    typeof verificationToken !== 'string'
  ) {
    next(
      ApiError.notFound(
        `verificationToken must be a string, null, or undefined`,
      ),
    );
    return;
  }

  if (
    resetPasswordToken !== undefined &&
    resetPasswordToken !== null &&
    typeof resetPasswordToken !== 'string'
  ) {
    next(
      ApiError.notFound(
        `resetPasswordToken must be a string, null, or undefined`,
      ),
    );
    return;
  }

  if (
    resetPasswordTokenExpiryDate !== undefined &&
    resetPasswordTokenExpiryDate !== null
  ) {
    try {
      // Convert the string to a Date object
      req.body.resetPasswordTokenExpiryDate = new Date(
        resetPasswordTokenExpiryDate,
      );
    } catch (e) {
      next(
        ApiError.notFound(
          `resetPasswordTokenExpiryDate must be a valid date string, null, or undefined`,
        ),
      );
      return;
    }
  }
  if (isAdmin !== true && isAdmin !== false) {
    next(ApiError.notFound(`isAdmin does not exist or is invalid`));
    return;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await createChapterByID(
      city,
      state,
      isAcceptingRequests,
      email,
      password,
      verified,
      verificationToken,
      resetPasswordToken,
      resetPasswordTokenExpiryDate,
      isAdmin,
    );
    res.sendStatus(StatusCode.CREATED);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Add better error handling
    // console.error('Chapter creation error:', err);
    if (err.code === 11000) {
      // MongoDB duplicate key error
      next(
        ApiError.badRequest('A chapter with this city or email already exists'),
      );
    } else {
      next(ApiError.internal(`Unable to register chapter: ${err.message}`));
    }
  }
};

export {
  toggleRequest,
  getAllChapters,
  getChapterById,
  deleteChapter,
  createChapter,
};
