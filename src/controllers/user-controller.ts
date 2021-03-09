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
        const letter = await this.userService.getUserById(request.params.id);
        response.json(letter);
      } catch (err) {
        console.error(err);
        response.status(500).json({
          error: String(err),
        });
      }
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