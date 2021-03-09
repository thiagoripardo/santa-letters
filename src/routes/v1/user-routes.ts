import express from 'express';
import UserController from 'controllers/user-controller';
import { authorizeJWT } from 'middlewares/auth-middleware';

const route = express.Router();
const userController = new UserController();

route.get('/user/:id', authorizeJWT, userController.getUserById);
route.patch('/user/:id', authorizeJWT, userController.updateUserById);
route.delete('/user/:id', authorizeJWT, userController.deleteUserById);

export default route;