// src/services/UserService.ts
import User from '../models/User';

class UserService {
  static async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error(`Error retrieving users: ${(error as Error).message}`);
    }
  }

  static async createUser(userData: any) {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      throw new Error(`Error creating user: ${(error as Error).message}`);
    }
  }

  static async deleteUser(userId: string) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw new Error(`Error deleting user: ${(error as Error).message}`);
    }
  }
}

export default UserService;
