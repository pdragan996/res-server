import mongoose from 'mongoose';
import { MenuItem } from '../types/restaurants/menu-item';

export interface Restaurant extends mongoose.Document {
  name: string;
  cityId: string;
  rating?: number;
  description?: string;
  location?: string;
  menu?: MenuItem[];
}

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cityId: { type: String, required: true },
  rating: { type: String, required: false },
  description: { type: String, required: false },
  location: { type: String, required: false },
});

export const RestaurantModel = mongoose.model<Restaurant>('Restaurant', restaurantSchema);