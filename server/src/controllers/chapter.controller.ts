/* eslint-disable import/prefer-default-export */
import express from 'express';
import ApiError from '../util/apiError.ts';
import StatusCode from '../util/statusCode.ts';
import {
  toggleRequestByID,
  getAllChaptersFromDB,
  getChapterById,
  deleteChapterByID,
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
  // get chapter email by chapter ID
  const chapter: IChapter | null = await getChapterById(id);
  if (!chapter) {
    next(ApiError.notFound(`Chapter does not exist`));
    return;
  }
  deleteChapterByID(id);
  try {
    res.sendStatus(StatusCode.CREATED);
  }
  catch (err) {
    next(ApiError.internal('Unable to register user.'));
  }
};

export { toggleRequest, getAllChapters, deleteChapter };