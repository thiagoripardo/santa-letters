import { Request, Response } from 'express';
import UserService from 'services/user-service';
export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUserById = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const user = await this.userService.getUserById(request.params.id);

      if(user) {
        delete user.password;

        return response.json(user);
      }

      return response.sendStatus(404);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  }

  public updateUserById = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const updatedUser = await this.userService
        .updateUserById(request.params.id, request.body);

      if(updatedUser) {
        delete updatedUser.password;

        return response.json(updatedUser);
      }

      return response.sendStatus(404);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  }

  public deleteUserById = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const deletedUserInfo = await this.userService
        .deleteUserById(request.params.id);
      response.json(deletedUserInfo);
    } catch (err) {
      console.error(err);
      response.status(500).json({
        error: String(err),
      });
    }
  }
}