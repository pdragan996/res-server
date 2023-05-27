import mongoose from 'mongoose';

export interface Place extends mongoose.Document {
  name: string;
  country: string;
  population: number;
}

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  population: { type: Number, required: true },
});

export const PlaceModel = mongoose.model<Place>('Place', placeSchema);