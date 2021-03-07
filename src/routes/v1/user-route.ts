import UserController from 'controllers/user-controller';

class UserRoute {
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
  }
}

export default new UserRoute();