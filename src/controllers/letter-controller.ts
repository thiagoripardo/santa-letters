import { Request, Response } from 'express';
import LetterService from 'services/letter-service';

export default class LetterController {
  private letterService: LetterService;

  constructor() {
    this.letterService = new LetterService();
  }

  public createLetter = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const createdLetter = await this.letterService.createLetter(request.body);
      response.json(createdLetter);
    } catch (err) {
      console.error(err);
      response.status(500).json({
        error: String(err),
      });
    }
  }

  public getLetters = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const letters = await this.letterService.getLetters();
      response.json(letters);
    } catch (err) {
      console.error(err);
      response.status(500).json({
        error: String(err),
      });
    }
  }

  public getLetterById = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const letter = await this.letterService.getLetterById(request.params.id);
      response.json(letter);
    } catch (err) {
      console.error(err);
      response.status(500).json({
        error: String(err),
      });
    }
  }

  public updateLetterById = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const updatedLetter = await this.letterService
        .updateLetterById(request.params.id, request.body);
      response.json(updatedLetter);
    } catch (err) {
      console.error(err);
      response.status(500).json({
        error: String(err),
      });
    }
  }

  public deleteLetterById = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const deletedLetter = await this.letterService
        .deleteLetterById(request.params.id);
      response.json(deletedLetter);
    } catch (err) {
      console.error(err);
      response.status(500).json({
        error: String(err),
      });
    }
  }
}