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

  async getRandomRestaurant(): Promise<Restaurant> {
    try {
      const count = await RestaurantModel.countDocuments();
      const randomNum = Math.floor(Math.random() * count);
      return await RestaurantModel.findOne().skip(randomNum).limit(1);
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  async update(id: string, restaurant: Restaurant): Promise<Restaurant | null> {
    return RestaurantModel.findByIdAndUpdate(id, restaurant);
  }

  async delete(id: string): Promise<Restaurant | null> {
    return RestaurantModel.findByIdAndDelete(id);
  }
}