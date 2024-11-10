import mongoose, { ObjectId } from 'mongoose';

enum ChildGender {
  'Boy',
  'Girl',
  'Transgender',
  'Non-binary/non-conforming',
  'Prefer not to say',
}

const childGenderOptions = [
  'Boy',
  'Girl',
  'Transgender',
  'Non-binary/non-conforming',
  'Prefer not to say',
];

enum ChildRace {
  'American Indian or Alaska Native',
  'Asian',
  'Black or African American',
  'Hispanic or Latino',
  'Middle Eastern or North African (MENA)',
  'Native Hawaiian or Pacific Islander',
  'White',
  'Other',
}

const childRaceOptions = [
  'American Indian or Alaska Native',
  'Asian',
  'Black or African American',
  'Hispanic or Latino',
  'Middle Eastern or North African (MENA)',
  'Native Hawaiian or Pacific Islander',
  'White',
  'Other',
];

enum ChildSituation {
  'Fostercare',
  'Homelessness',
  'Domestic Violence',
  'Medical treatment',
  'Financial insecurities',
}

const childSituationOptions = [
  'Fostercare',
  'Homelessness',
  'Domestic Violence',
  'Medical treatment',
  'Financial insecurities',
];

const BirthdayRequestSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true,
  },
  deadlineDate: {
    type: Date,
    required: true,
  },
  childBirthday: {
    type: Date,
    required: true,
  },
  childName: {
    type: String,
    required: true,
  },
  childAge: {
    type: Number,
    required: true,
  },
  childGender: {
    type: String,
    enum: childGenderOptions,
    required: true,
  },
  childRace: {
    type: String,
    enum: childRaceOptions,
    required: true,
  },
  childInterests: {
    type: String,
    required: true,
  },
  giftSuggestions: {
    type: String,
    required: false,
  },
  childAllergies: {
    type: Boolean,
    required: true,
  },
  allergyDetails: {
    type: String,
    required: false,
  },
  additionalInfo: {
    type: String,
    required: false,
  },
  childSituation: {
    type: String,
    enum: childSituationOptions,
    required: true,
  },
  agencyWorkerName: {
    type: String,
    required: true,
  },
  agencyOrganization: {
    type: String,
    required: true,
  },
  agencyPhysicalAddress: {
    type: String,
    required: true,
  },
  agencyWorkerPhone: {
    type: String,
    required: true,
  },
  agencyWorkerEmail: {
    type: String,
    required: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  isFirstReferral: {
    type: Boolean,
    required: true,
  },
  agreeFeedback: {
    type: Boolean,
    required: true,
  },
  agreeLiability: {
    type: Boolean,
    required: true,
  },
  requestedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Delivered'],
    required: true,
    default: 'Pending',
  },
  deliveryDate: {
    type: Date,
    required: false,
  },
});

interface IBirthdayRequestFields {
  _id: string;
  chapterId: string;
  deadlineDate: Date;
  childBirthday: Date;
  childName: string;
  childAge: number;
  childGender: ChildGender;
  childRace: ChildRace;
  childInterests: string;
  giftSuggestions: string;
  childAllergies: boolean;
  allergyDetails: string;
  additionalInfo: string;
  childSituation: ChildSituation;
  agencyWorkerName: string;
  agencyOrganization: string;
  agencyPhysicalAddress: string;
  agencyWorkerPhone: string;
  agencyWorkerEmail: string;
  isFirstReferral: boolean;
  agreeFeedback: boolean;
  agreeLiability: boolean;
  requestedDate: Date;
  status: 'Pending' | 'Approved' | 'Delivered';
  deliveryDate: Date | null;
}

interface IBirthdayRequest extends mongoose.Document, IBirthdayRequestFields {
  _id: string;
}

const BirthdayRequest = mongoose.model<IBirthdayRequest>(
  'BirthdayRequest',
  BirthdayRequestSchema,
);

export {
  IBirthdayRequest,
  IBirthdayRequestFields,
  BirthdayRequest,
  ChildGender,
  ChildRace,
  ChildSituation,
  childGenderOptions,
  childRaceOptions,
  childSituationOptions,
};
