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

const getAllBoxesDelivered = async () => {
  const countDelivered = await BirthdayRequest.countDocuments({
    status: 'Delivered',
  }).exec();
  return countDelivered;
};

const updateRequestStatusByID = async (id: string, updatedValue: string) => {
  const updatedRequest = await BirthdayRequest.findByIdAndUpdate(id, [
    { $set: { status: updatedValue } },
    // { $eq: [updatedValue, '$status'] }
  ]).exec();
  // console.log(updatedRequest)
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
 * @param chapterId - id representing the chapter the bithdayrequest is associated with
 * @param deadlineDate - TBD
 * @param childBirthday - TBD
 * @param childAge - TBD
 * @param childName - TBD
 * @param childGender - TBD
 * @param childRace - TBD
 * @param childSituation - TBD
 * @param childInterests - TBD
 * @param childAllergies - TBD
 * @param allergyDetails - TBD
 * @param giftSuggestions - TBD
 * @param additionalInfo - TBD
 * @param agencyWorkerName - TBD
 * @param agencyAddress - TBD
 * @param agencyOrganization - TBD
 * @param agencyWorkerPhone - TBD
 * @param agencyWorkerEmail - TBD
 * @param isFirstReferral - TBD
 * @param agreeFeedback - TBD
 * @param liability - TBD
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
  childSituation: string,
  childGender: string,
  childRace: string,
  childInterests: string,
  childAllergies: boolean,
  allergyDetails: string,
  giftSuggestions: string,
  additionalInfo: string,
  agencyWorkerName: string,
  agencyAddress: string,
  agencyOrganization: string,
  agencyWorkerPhone: string,
  agencyWorkerEmail: string,
  isFirstReferral: boolean,
  agreeFeedback: any,
  liability: any,
) => {
  const newBirthdayRequest = new BirthdayRequest({
    chapterId,
    deadlineDate,
    childBirthday,
    childAge,
    childName,
    childGender,
    childRace,
    childSituation,
    childInterests,
    childAllergies,
    allergyDetails,
    giftSuggestions,
    additionalInfo,
    agencyWorkerName,
    agencyOrganization,
    agencyWorkerPhone,
    agencyAddress,
    agencyWorkerEmail,
    isFirstReferral,
    agreeFeedback,
    liability,
    requestedDate: new Date(),
    status: 'Pending',
    deliveryDate: null,
  });
  const returnedBirthdayRequest = await newBirthdayRequest.save();
  return returnedBirthdayRequest;
};

// const getMonthlyOverviewByDate = async (startDate: Date, endDate: Date) => {
//   return BirthdayRequest.aggregate([
//     {
//       $match: {
//         deliveryDate: { $gte: startDate, $lte: endDate },
//         status: 'Delivered',
//       },
//     },
//     {
//       $group: {
//         _id: {
//           ageRange: {
//             $switch: {
//               branches: [
//                 {
//                   case: {
//                     $and: [
//                       { $gte: ['$childAge', 1] },
//                       { $lte: ['$childAge', 5] },
//                     ],
//                   },
//                   then: '1-5',
//                 },
//                 {
//                   case: {
//                     $and: [
//                       { $gte: ['$childAge', 6] },
//                       { $lte: ['$childAge', 9] },
//                     ],
//                   },
//                   then: '6-9',
//                 },
//                 {
//                   case: {
//                     $and: [
//                       { $gte: ['$childAge', 9] },
//                       { $lte: ['$childAge', 12] },
//                     ],
//                   },
//                   then: '9-12',
//                 },
//               ],
//               default: 'Other',
//             },
//           },
//           race: '$childRace',
//           gender: '$childGender',
//           situation: '$childSituation',
//         },
//         count: { $sum: 1 },
//       },
//     },
//     {
//       $group: {
//         _id: '$_id.ageRange',
//         race: { $push: { race: '$_id.race', count: '$count' } },
//         gender: { $push: { gender: '$_id.gender', count: '$count' } },
//         situation: { $push: { situation: '$_id.situation', count: '$count' } },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         ageRange: '$_id',
//         race: 1,
//         gender: 1,
//         situation: 1,
//       },
//     },
//   ]).exec();
// };

const getMonthlyOverviewByDate = async (startDate: Date, endDate: Date) => {
  return BirthdayRequest.aggregate([
    {
      $match: {
        deliveryDate: { $gte: startDate, $lte: endDate },
        status: 'Delivered',
      },
    },
    {
      $facet: {
        ageCounts: [
          {
            $group: {
              _id: {
                $switch: {
                  branches: [
                    {
                      case: {
                        $and: [
                          { $gte: ['$childAge', 1] },
                          { $lte: ['$childAge', 5] },
                        ],
                      },
                      then: '1-5',
                    },
                    {
                      case: {
                        $and: [
                          { $gte: ['$childAge', 6] },
                          { $lte: ['$childAge', 9] },
                        ],
                      },
                      then: '6-9',
                    },
                    {
                      case: {
                        $and: [
                          { $gte: ['$childAge', 10] },
                          { $lte: ['$childAge', 12] },
                        ],
                      },
                      then: '10-12',
                    },
                  ],
                  default: 'Other',
                },
              },
              count: { $sum: 1 },
            },
          },
        ],
        raceCounts: [
          {
            $group: {
              _id: '$childRace',
              count: { $sum: 1 },
            },
          },
        ],
        genderCounts: [
          {
            $group: {
              _id: '$childGender',
              count: { $sum: 1 },
            },
          },
        ],
        situationCounts: [
          {
            $group: {
              _id: '$childSituation',
              count: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $project: {
        ageCounts: {
          $arrayToObject: {
            $map: {
              input: '$ageCounts',
              as: 'item',
              in: { k: '$$item._id', v: '$$item.count' },
            },
          },
        },
        raceCounts: {
          $arrayToObject: {
            $map: {
              input: '$raceCounts',
              as: 'item',
              in: { k: '$$item._id', v: '$$item.count' },
            },
          },
        },
        genderCounts: {
          $arrayToObject: {
            $map: {
              input: '$genderCounts',
              as: 'item',
              in: { k: '$$item._id', v: '$$item.count' },
            },
          },
        },
        situationCounts: {
          $arrayToObject: {
            $map: {
              input: '$situationCounts',
              as: 'item',
              in: { k: '$$item._id', v: '$$item.count' },
            },
          },
        },
      },
    },
  ]);
};

export {
  getAllRequestsByID,
  updateRequestStatusByID,
  getRequestById,
  deleteRequestByID,
  createBirthdayRequestByID,
  getAllBoxesDelivered,
  getMonthlyOverviewByDate,
};
