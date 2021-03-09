import express from 'express';

import AuthenticationController from 'controllers/auth-controller';

const route = express.Router();
const authenticationController = new AuthenticationController();

route.post('/auth/signup', authenticationController.registerUser);
route.post('/auth/login', authenticationController.getUserToken);

export default route;