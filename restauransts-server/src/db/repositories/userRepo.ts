import { User, UserDocument } from '../models/user';

export const createUser = async (user: UserDocument) => {
  return User.create(user);
}

export const getAllUsers = async () => {
  return User.find();
}

export const getUserById = async (id: string) => {
  return User.findById(id);
}

export const updateUser = async (id: string, updates: Partial<UserDocument>) => {
  return User.findByIdAndUpdate(id, updates, {new: true});
}

export const deleteUser = async (id: string) => {
  return User.findByIdAndDelete(id);
}