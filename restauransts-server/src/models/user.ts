import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string;
  email: string;
  job?: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  job: { type: String, required: false },
});

export const UserModel = mongoose.model<User>('User', userSchema);
