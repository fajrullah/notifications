import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
