import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';

export const findAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const { username, password } = userData;
  
  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('Username already exists');
  }

  // Hash the password
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(password, salt);
  }

  const newUser = new User(userData);
  return await newUser.save();
};

export const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
  // If updateData contains password, hash it before saving
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(updateData.password, salt);
  }
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};
