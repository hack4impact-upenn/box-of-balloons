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

export { toggleRequestByID, getAllChaptersFromDB };
