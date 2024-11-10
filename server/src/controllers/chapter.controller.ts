import express from 'express';
import { Chapter } from '../models/chapter.model.ts';

const getChapters = async (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  const chapters = await Chapter.find();
  res.send(chapters);
};

export default getChapters;
