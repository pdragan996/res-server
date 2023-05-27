import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isSuperAdmin: boolean;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSuperAdmin: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },
});

export const UserModel = mongoose.model<User>('User', userSchema);
