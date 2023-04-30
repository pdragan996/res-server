import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export async function connect(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
    } );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
