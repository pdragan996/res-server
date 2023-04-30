import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
}

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
})

export const User = mongoose.model<UserDocument>('User', userSchema);