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
    enum: ['Boy', 'Girl'],
    required: true,
  },
  childRace: {
    type: String,
    enum: [
      'White',
      'Black or African American',
      'Hispanic or Latino',
      'Native American or American Indian',
      'Asian / Pacific Islander',
      'Not Sure',
    ],
    required: true,
  },
  childInterests: {
    type: String,
    required: true,
  },
  childAllergies: {
    type: Boolean,
    required: true,
  },
  allergyDetails: {
    type: String,
    required: false,
  },
  giftSuggestions: {
    type: String,
    required: false,
  },
  additionalInfo: {
    type: String,
    required: false,
  },
  agencyWorkerName: {
    type: String,
    required: true,
  },
  agencyOrganization: {
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

const BirthdayRequest = mongoose.model<IBirthdayRequest>(
  'BirthdayRequest',
  BirthdayRequestSchema,
);

export { IBirthdayRequest, BirthdayRequest };
