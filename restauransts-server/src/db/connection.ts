import * as mongoose from 'mongoose';
import { uri } from '../app.config';
import { ConnectOptions } from 'mongodb';

const dbUrl = uri;
const op: ConnectOptions = {}

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl, {
    })
    console.log('Connected to db successfully');
  } catch (err) {
    console.log('Connection failed ' + err);
  }
}