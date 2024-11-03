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

/**
 * Creates a new birthdayrequest in the database.
 * @param chapterId - id representing the chapter the bithdayrequest is associated with
 * @param deadlineDate - TBD
 * @param childBirthday - TBD
 * @param childAge - TBD
 * @param childName - TBD
 * @param childGender - TBD
 * @param childRace - TBD
 * @param childInterests - TBD
 * @param childAllergies - TBD
 * @param allergyDetails - TBD
 * @param giftSuggestions - TBD
 * @param additionalInfo - TBD
 * @param agencyWorkerName - TBD
 * @param agencyOrganization - TBD
 * @param agencyWorkerPhone - TBD
 * @param agencyWorkerEmail - TBD
 * @param isFirstReferral - TBD
 * @param agreeFeedback - TBD
 * @param requestedDate - TBD
 * @param status - TBD
 * @param deliveryDate - TBD
 * @returns The created {@link BirthdayRequest}
 */
const createBirthdayRequestByID = async (
  chapterId: string,
  deadlineDate: Date,
  childBirthday: Date,
  childAge: number,
  childName: string,
  childGender: string,
  childRace: string,
  childInterests: string,
  childAllergies: boolean,
  allergyDetails: string,
  giftSuggestions: string,
  additionalInfo: string,
  agencyWorkerName: string,
  agencyOrganization: string,
  agencyWorkerPhone: string,
  agencyWorkerEmail: string,
  isFirstReferral: boolean,
  agreeFeedback: boolean,
  requestedDate: Date,
  status: string,
  deliveryDate: Date,

) => {
  const newBirthdayRequest = new BirthdayRequest({
    chapterId,
    deadlineDate,
    childBirthday,
    childAge,
    childName,
    childGender,
    childRace,
    childInterests,
    childAllergies,
    allergyDetails,
    giftSuggestions,
    additionalInfo,
    agencyWorkerName,
    agencyOrganization,
    agencyWorkerPhone,
    agencyWorkerEmail,
    isFirstReferral,
    agreeFeedback,
    requestedDate,
    status,
    deliveryDate,
  });
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
