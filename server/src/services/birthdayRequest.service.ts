/* eslint-disable import/prefer-default-export */
import { BirthdayRequest } from '../models/birthdayRequest.model.ts';

const removeSensitiveDataQuery = [
  '-password',
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

const getAllRequestsByID = async (id: string) => {
  const requestsList = await BirthdayRequest.findOne({ id })
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

export {
  getAllRequestsByID,
  updateRequestStatusByID,
  getRequestById,
  deleteRequestByID,
};
