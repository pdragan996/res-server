import { UserModel, User } from '../models/user';

export class UserRepository {
  async getAll(): Promise<User[]> {
    return UserModel.find();
  }

  async getById(id: string): Promise<User | null> {
    return UserModel.findById(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({"email": email});
  }

  async getByUsername(username: string): Promise<User | null> {
    return UserModel.findOne({"username": username});
  }

  async create(user: User): Promise<User> {
    const newUser = new UserModel(user);
    return newUser.save();
  }

  async update(id: string, user: User): Promise<User | null> {
    return UserModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User | null> {
    return UserModel.findByIdAndDelete(id);
  }
}
