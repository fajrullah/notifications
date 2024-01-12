// src/controllers/UserController.ts
import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const newUser = await UserService.createUser(userData);
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const deletedUser = await UserService.deleteUser(userId);
      res.json(deletedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export default UserController;
