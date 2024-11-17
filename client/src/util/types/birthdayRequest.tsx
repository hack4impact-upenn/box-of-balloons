import mongoose from 'mongoose';

interface IBirthdayRequest extends mongoose.Document {
  _id: string;
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
  requestedDate: Date;
  status: 'Pending' | 'Approved' | 'Delivered';
  deliveryDate: Date | null;
}

export type { IBirthdayRequest };
