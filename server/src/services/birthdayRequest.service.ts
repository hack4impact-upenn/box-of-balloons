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
  getMonthlyOverviewByDate,
};
