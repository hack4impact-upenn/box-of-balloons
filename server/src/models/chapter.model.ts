import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: String,
    required: true,
  },
  isAcceptingRequests: {
    type: Boolean,
    required: true,
    default: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationToken: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  resetPasswordToken: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  resetPasswordTokenExpiryDate: {
    type: Date,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

interface IChapter extends mongoose.Document {
  _id: string;
  city: string;
  state: string;
  isAcceptingRequests: boolean;
  email: string;
  password: string;
  verified: boolean;
  verificationToken: string | null | undefined;
  resetPasswordToken: string | null | undefined;
  resetPasswordTokenExpiryDate: Date | null | undefined;
  isAdmin: boolean;
}

const Chapter = mongoose.model<IChapter>('Chapter', ChapterSchema);

export { IChapter, Chapter };
