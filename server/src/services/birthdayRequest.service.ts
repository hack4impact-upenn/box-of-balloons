import { BirthdayRequest } from '../models/birthdayRequest.model.ts';

interface ICreateBirthdayRequestParams {
  chapterId: string;
  deadlineDate: Date;
  childBirthday: Date;
  childAge: number;
  childName: string;
  childGender: 'Boy' | 'Girl';
  childRace:
    | 'White'
    | 'Black or African American'
    | 'Hispanic or Latino'
    | 'Native American or American Indian'
    | 'Asian / Pacific Islander'
    | 'Not Sure';
  childInterests: string;
  childAllergies: boolean;
  allergyDetails: string;
  giftSuggestions: string;
  additionalInfo: string;
  agencyWorkerName: string;
  agencyOrganization: string;
  agencyWorkerPhone: string;
  agencyWorkerEmail: string;
  isFirstReferral: boolean;
  agreeFeedback: boolean;
}
const createBirthdayRequestParamsList = [
  'chapterId',
  'deadlineDate',
  'childBirthday',
  'childAge',
  'childName',
  'childGender',
  'childRace',
  'childInterests',
  'childAllergies',
  'allergyDetails',
  'giftSuggestions',
  'additionalInfo',
  'agencyWorkerName',
  'agencyOrganization',
  'agencyWorkerPhone',
  'agencyWorkerEmail',
  'isFirstReferral',
  'agreeFeedback',
];

const createBirthdayRequest = async (params: ICreateBirthdayRequestParams) => {
  const newBirthdayRequest = new BirthdayRequest({
    ...params,
    requestedDate: Date(),
    status: 'Pending',
    deliveryDate: null,
  });
  const birthdayRequest = await newBirthdayRequest.save();
  return birthdayRequest;
};

export {
  ICreateBirthdayRequestParams,
  createBirthdayRequest,
  createBirthdayRequestParamsList,
};
