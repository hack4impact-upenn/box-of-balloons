/* eslint-disable import/prefer-default-export */
import { Chapter, IChapter } from '../models/chapter.model.ts';

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

const getAllChaptersFromDB = async (): Promise<IChapter[]> => {
  const userList = await Chapter.find({})
    .select(removeSensitiveDataQuery)
    .exec();
  return userList;
};

const getChapterByIdFromDB = async (id: string): Promise<IChapter | null> => {
  const chapter = await Chapter.findById(id)
    .select(removeSensitiveDataQuery)
    .exec();
  return chapter;
};

const deleteChapterByID = async (id: string) => {
  const chapter = await Chapter.findByIdAndDelete(id).exec();
  return chapter;
};

/**
 * Creates a new chapter in the database.
 * @param city - The city the chapter is located in
 * @param state - The state the chapter is located in
 * @param isAcceptingRequests - Whether the chapter is accepting requests
 * @param email - The email of the chapter
 * @param password - The password of the chapter
 * @param verified - Whether the chapter is verified
 * @param verificationToken - The verification token of the chapter
 * @param resetPasswordToken - The reset password token of the chapter
 * @param resetPasswordTokenExpiryDate - The expiry date of the reset password token
 * @param isAdmin - Whether the chapter is an admin
 * @returns The created {@link Chapter}
 */
const createChapterByID = async (
  city: string,
  state: string,
  isAcceptingRequests: boolean,
  email: string,
  password: string,
  verified: boolean,
  verificationToken: string,
  resetPasswordToken: string,
  resetPasswordTokenExpiryDate: Date,
  isAdmin: boolean,
) => {
  const newChapter = new Chapter({
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
  });
  const returnedChapter = await newChapter.save();
  return returnedChapter;
};

export {
  toggleRequestByID,
  getAllChaptersFromDB,
  getChapterByIdFromDB,
  deleteChapterByID,
  createChapterByID,
};
