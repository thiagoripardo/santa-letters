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
      return response.status(201).json(createdLetter);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  }

  public getLetters = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const letters = await this.letterService.getLetters();
      
      if (letters.length > 0) return response.json(letters);

      return response.sendStatus(404);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  }

  public getLetterById = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const letter = await this.letterService.getLetterById(request.params.id);

      if (letter) return response.json(letter);

      return response.sendStatus(404);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  }

  public updateLetterById = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const updatedLetter = await this.letterService
        .updateLetterById(request.params.id, request.body);

      if (updatedLetter) return response.json(updatedLetter);

      return response.sendStatus(404);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  }

  public deleteLetterById = async (request: Request,
    response: Response): Promise<Response | void> => {
    try {
      const deletedLetterInfo = await this.letterService
        .deleteLetterById(request.params.id);
      return response.json(deletedLetterInfo);
    } catch (err) {
      console.error(err);
      return response.status(500).json({
        error: String(err),
      });
    }
  }
}