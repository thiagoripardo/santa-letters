import { Request, Response } from 'express';
import AuthenticationService from 'services/authentication-service';

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
    response.json({ message: 'ok' });
  }
}