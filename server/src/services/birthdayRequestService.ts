// import { BirthdayRequest } from '../model';

// export async function getMonthlyOverview(startDate: Date, endDate: Date) {
//   return await BirthdayRequest.aggregate([
//     {
//       $match: {
//         deliveryDate: {
//           $gte: startDate,
//           $lte: endDate,
//         },
//       },
//     },
//     {
//       $facet: {
//         ageCounts: [
//           {
//             $bucket: {
//               groupBy: '$childAge',
//               boundaries: [1, 6, 10, 13], // Adjust based on age ranges
//               default: 'Other',
//               output: {
//                 count: { $sum: 1 },
//               },
//             },
//           },
//         ],
//         raceCounts: [
//           {
//             $group: {
//               _id: '$childRace',
//               count: { $sum: 1 },
//             },
//           },
//         ],
//         genderCounts: [
//           {
//             $group: {
//               _id: '$childGender',
//               count: { $sum: 1 },
//             },
//           },
//         ],
//         situationCounts: [
//           {
//             $group: {
//               _id: '$childSituation',
//               count: { $sum: 1 },
//             },
//           },
//         ],
//       },
//     },
//   ]);
// }


import { BirthdayRequest } from '../model';

export async function getMonthlyOverview() {
  return await BirthdayRequest.find({}).limit(5);
}
