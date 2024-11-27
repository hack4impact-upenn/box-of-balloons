/* eslint-disable import/prefer-default-export */
import {
  BirthdayRequest,
  IBirthdayRequestFields,
} from '../models/birthdayRequest.model.ts';

const removeSensitiveDataQuery = [
  '-password',
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

const getAllRequestsByID = async (id: string) => {
  const requestsList = await BirthdayRequest.find({ chapterId: id })
    .select(removeSensitiveDataQuery)
    .exec();
  return requestsList;
};

const updateRequestStatusByID = async (id: string, updatedValue: string) => {
  const updatedRequest = await BirthdayRequest.findByIdAndUpdate(id, [
    { $set: { status: updatedValue } },
    // { $eq: [updatedValue, '$status'] }
  ]).exec();
  return updatedRequest;
};

const getRequestById = async (id: string) => {
  const request = await BirthdayRequest.findById(id)
    .select(removeSensitiveDataQuery)
    .exec();
  return request;
};

const deleteRequestByID = async (id: string) => {
  const request = await BirthdayRequest.findByIdAndDelete(id).exec();
  return request;
};

type CreateBirthdayRequestByIDParams = Omit<
  IBirthdayRequestFields,
  '_id' | 'requestedDate' | 'status' | 'deliveryDate'
>;

/**
 * Creates a new birthdayrequest in the database.
 * @returns The created {@link BirthdayRequest}
 */
const createBirthdayRequestByID = async (
  params: CreateBirthdayRequestByIDParams,
) => {
  const newBirthdayRequest = new BirthdayRequest(params);
  const returnedBirthdayRequest = await newBirthdayRequest.save();
  return returnedBirthdayRequest;
};

export {
  getAllRequestsByID,
  updateRequestStatusByID,
  getRequestById,
  deleteRequestByID,
  createBirthdayRequestByID,
};
