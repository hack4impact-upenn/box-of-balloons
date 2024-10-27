import mongoose from 'mongoose';

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
  childAge: {
    type: Number,
    required: true,
  },
  childName: {
    type: String,
    required: true,
  },
  childGender: {
    type: String,
    required: true,
  },
  childRace: {
    type: String,
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
    enum: [
      'Foster Care',
      'Homelessness',
      'Domestic Violence',
      'Medical Treatment',
      'Financial Insecurity',
    ],
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
  agencyAddress: {
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

interface IBirthdayRequest extends mongoose.Document {
  _id: string;
  chapterId: string;
  deadlineDate: Date;
  childBirthday: Date;
  childAge: number;
  childName: string;
  childGender: string;
  childRace: string;
  childInterests: string;
  giftSuggestions: string;
  childAllergies: boolean;
  allergyDetails: string;
  additionalInfo: string;
  childSituation:
    | 'Foster Care'
    | 'Homelessness'
    | 'Domestic Violence'
    | 'Medical Treatment'
    | 'Financial Insecurity';
  agencyWorkerName: string;
  agencyOrganization: string;
  agencyAddress: string;
  agencyWorkerPhone: string;
  agencyWorkerEmail: string;
  isFirstReferral: boolean;
  agreeFeedback: boolean;
  requestedDate: Date;
  status: 'Pending' | 'Approved' | 'Delivered';
  deliveryDate: Date | null;
}

const BirthdayRequest = mongoose.model<IBirthdayRequest>(
  'BirthdayRequest',
  BirthdayRequestSchema,
);

export { IBirthdayRequest, BirthdayRequest };
