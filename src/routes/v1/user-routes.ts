import express from 'express';

import UserController from 'controllers/user-controller';

const route = express.Router();
const userController = new UserController();

route.get('/user/:id', userController.getUserById);
route.patch('/user/:id', userController.updateUserById);
route.delete('/user/:id', userController.deleteUserById);

export default route;