import { Restaurant, RestaurantModel } from '../models/restaurant';

export class RestaurantsRepository {
  async getAll(): Promise<Restaurant[]> {
    return RestaurantModel.find();
  }

  async getById(id: string): Promise<Restaurant | null> {
    return RestaurantModel.findById(id);
  }

  async create(restaurant: Restaurant): Promise<Restaurant> {
    const newRestaurant = new RestaurantModel(restaurant);
    return newRestaurant.save();
  }

  async update(id: string, restaurant: Restaurant): Promise<Restaurant | null> {
    return RestaurantModel.findByIdAndUpdate(id, restaurant);
  }

  async delete(id: string): Promise<Restaurant | null> {
    return RestaurantModel.findByIdAndDelete(id);
  }
}