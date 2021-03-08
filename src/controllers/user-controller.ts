import { Request, Response } from 'express';
import UserService from 'services/user-service';
export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getUserById = async (request: Request, 
    response: Response): Promise<Response | void> => {
      response.json({message: 'ok'});
  }

  public updateUserById = async (request: Request, 
    response: Response): Promise<Response | void> => {
      response.json({message: 'ok'});
  }

  public deleteUserById = async (request: Request, 
    response: Response): Promise<Response | void> => {
      response.json({message: 'ok'});
  }
}