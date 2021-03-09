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
      const registerUserResponse = await this.authenticationService
        .signup(request.body);
      response.json(registerUserResponse);
    } catch (err) {
      console.error(err);
      response.status(500).json({
        error: String(err),
      });
    }
  }

  public getUserToken = async (request: Request,
    response: Response): Promise<Response | void> => {
      try {
        const loginUserResponse = await this.authenticationService
          .login(request.body);
        response.json(loginUserResponse);
      } catch (err) {
        console.error(err);
        response.status(500).json({
          error: String(err),
        });
      }
  }
}