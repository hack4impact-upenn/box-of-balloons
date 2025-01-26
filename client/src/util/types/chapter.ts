interface IChapter {
  id: string;
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

export default IChapter;
