/* eslint-disable import/prefer-default-export */
import { Chapter } from '../models/chapter.model.ts';

const removeSensitiveDataQuery = [
  '-password',
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

const toggleRequestByID = async (id: string) => {
  const chapter = await Chapter.findByIdAndUpdate(id, [
    { $set: { isAcceptingRequests: { $not: '$isAcceptingRequests' } } },
  ]).exec();
  return chapter;
};

const getAllChaptersFromDB = async () => {
  const userList = await Chapter.find({})
    .select(removeSensitiveDataQuery)
    .exec();
  return userList;
};

const getChapterById = async (id: string) => {
  const chapter = await Chapter.findById(id)
    .select(removeSensitiveDataQuery)
    .exec();
  return chapter;
};

const deleteChapterByID = async (id: string) => {
  const chapter = await Chapter.findByIdAndDelete(id).exec();
  return chapter;
}

export { toggleRequestByID, getAllChaptersFromDB, getChapterById, deleteChapterByID };