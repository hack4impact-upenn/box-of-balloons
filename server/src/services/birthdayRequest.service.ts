import { BirthdayRequest } from '../models/birthdayRequest.model';

const getRequestsByChapter = async (chapterId : string) => {
  const birthdayRequests = await BirthdayRequest.find({
    chapterId,
  }).exec();
  return birthdayRequests;
};

export { getRequestsByChapter };
