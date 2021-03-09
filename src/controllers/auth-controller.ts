import { Request, Response } from 'express';
import AuthenticationService from 'services/auth-service';

export default class AuthenticationController {
  private authenticationService: AuthenticationService;

  constructor() {
    this.authenticationService = new AuthenticationService();
  }

  public registerUser = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const registeredUser = await this.authenticationService
        .signup(request.body);
      delete registeredUser.password;

      return response.status(201).json(registeredUser);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  }

  public getUserToken = async (request: Request,
    response: Response): Promise<Response | void> => {
      try {
        const loggedUser = await this.authenticationService
          .login(request.body);
        return response.json(loggedUser);
      } catch (err) {
        console.error(err);
        return response.status(500).json({
          error: String(err),
        });
      }
  }
}