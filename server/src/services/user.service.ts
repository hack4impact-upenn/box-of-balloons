/**
 * All the functions for interacting with user data in the MongoDB database
 */
import { hash } from 'bcrypt';
import { User } from '../models/user.model.ts';

const passwordHashSaltRounds = 10;
const removeSensitiveDataQuery = [
  '-password',
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

const removeSensitiveDataQueryKeepPassword = [
  '-verificationToken',
  '-resetPasswordToken',
  '-resetPasswordTokenExpiryDate',
];

/**
 * Creates a new user in the database.
 * @param city - string representing the city of the chapter
 * @param state - string representing the state of the chapter
 * @param email - string representing the email of the user
 * @param password - string representing the password of the user
 * @returns The created {@link User}
 */
const createUser = async (
  city: string,
  state: string,
  email: string,
  password: string,
) => {
  const hashedPassword = await hash(password, passwordHashSaltRounds);
  if (!hashedPassword) {
    return null;
  }
  const newUser = new User({
    city,
    state,
    email,
    password: hashedPassword,
    admin: false,
  });
  const user = await newUser.save();
  return user;
};

/**
 * Gets a user from the database by their email but doesn't include the
 * password in the returned user.
 * @param email The email of the user to get
 * @returns The {@link User} or null if the user was not found.
 */
const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email })
    .select(removeSensitiveDataQuery)
    .exec();
  return user;
};

/**
 * Gets a user from the database by their email and includes the password in
 * the returned user.
 * @param email The email of the user to get
 * @returns The {@link User} or null if the user was not found.
 */
const getUserByEmailWithPassword = async (email: string) => {
  const user = await User.findOne({ email })
    .select(removeSensitiveDataQueryKeepPassword)
    .exec();
  return user;
};

/**
 * Gets a user from the database by their verification token but doesn't include
 * the password in the returned user.
 * @param verificationToken The {@link string} representing the verification token
 * @returns The {@link User} or null if the user was not found.
 */
const getUserByVerificationToken = async (verificationToken: string) => {
  const user = await User.findOne({ verificationToken })
    .select(removeSensitiveDataQuery)
    .exec();
  return user;
};

/**
 * Gets a user from the database by their id but doesn't include the
 * password in the returned user.
 * @param id The id of the user to get.
 * @returns The {@link User} or null if the user was not found.
 */
const getUserById = async (id: string) => {
  const user = await User.findById(id).select(removeSensitiveDataQuery).exec();
  return user;
};

/**
 * Gets a user from the database by their reset password token if the token
 * is not expired.
 * @param verificationToken The {@link string} representing the verification token
 * @returns The {@link User} or null if such a user was not found.
 */
const getUserByResetPasswordToken = async (resetPasswordToken: string) => {
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpiryDate: { $gt: Date.now() },
  }).exec();
  return user;
};

/**
 * @returns All the {@link User}s in the database without their passwords.
 */
const getAllUsersFromDB = async () => {
  const userList = await User.find({}).select(removeSensitiveDataQuery).exec();
  return userList;
};

/**
 * A function that upgrades a certain user to an admin.
 * @param id The id of the user to upgrade.
 * @returns The upgraded {@link User}
 */
const upgradeUserToAdmin = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, [
    { $set: { admin: { $eq: [false, '$admin'] } } },
  ]).exec();
  return user;
};

/**
 * A function that deletes a user from the database.
 * @param id The id of the user to delete.
 * @returns The deleted {@link User}
 */
const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id).exec();
  return user;
};

const toggleRequestByID = async (id: string) => {
  const chapter = await User.findByIdAndUpdate(id, [
    { $set: { isAcceptingRequests: { $not: '$isAcceptingRequests' } } },
  ]).exec();
  return chapter;
};

const countActiveUsers = async () => {
  const activeUserCount = await User.countDocuments({ isActive: true }).exec();
  return activeUserCount;
};

const countAcceptingRequestsUsers = async () => {
  const acceptingRequestsUserCount = await User.countDocuments({
    isAcceptingRequests: true,
  }).exec();
  return acceptingRequestsUserCount;
};

/**
 * Gets all users from the database by their state but doesn't include
 * sensitive data in the returned users.
 * @param state The state to query for
 * @returns An array of {@link User}s or empty array if no users were found
 */
const getUsersByState = async (state: string) => {
  const users = await User.find({ state })
    .select(removeSensitiveDataQuery)
    .exec();
  return users;
};

export {
  passwordHashSaltRounds,
  createUser,
  getUserByEmail,
  getUserByVerificationToken,
  getUserById,
  getUserByEmailWithPassword,
  getUserByResetPasswordToken,
  getAllUsersFromDB,
  upgradeUserToAdmin,
  deleteUserById,
  toggleRequestByID,
  countActiveUsers,
  countAcceptingRequestsUsers,
  getUsersByState,
};
