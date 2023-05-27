import { Place, PlaceModel } from '../models/place';

export class PlacesRepository {
  async getAll(): Promise<Place[]> {
    return PlaceModel.find();
  }

  async getById(id: string): Promise<Place | null> {
    return PlaceModel.findById(id);
  }

  async create(restaurant: Place): Promise<Place> {
    const newPlace = new PlaceModel(restaurant);
    return newPlace.save();
  }

  async update(id: string, restaurant: Place): Promise<Place | null> {
    return PlaceModel.findByIdAndUpdate(id, restaurant);
  }

  async delete(id: string): Promise<Place | null> {
    return PlaceModel.findByIdAndDelete(id);
  }
}