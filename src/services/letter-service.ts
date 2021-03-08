import { Letter } from 'models/letter-model';
import LetterRepository from 'repositories/letter-repository';

export default class LetterService {
  private letterRepository: LetterRepository;

  constructor() {
      this.letterRepository = new LetterRepository();
  }

  public getLetterRepository(): LetterRepository {
    return this.letterRepository;
  }

  public async createLetter(letter: Letter): Promise<any> {
    this.validate(letter);
    return await this.letterRepository.createLetter(letter);
  }

  public async getLetters(): Promise<any> {
    return await this.letterRepository.getLetters();
  }

  public async getLetterById(id: String): Promise<any> {
    return await this.letterRepository.getLetterById(id);
  }

  public async updateLetterById(id: String, letter: Letter): Promise<any> {
    this.validate(letter);
    return await this.letterRepository.updateLetterById(id, letter);
  }

  public async deleteLetterById(id: String): Promise<any> {
    return await this.letterRepository.deleteLetterById(id);
  }

  validate(letter: Letter): void {
    const {
      body
    } = letter;

    if (!body) {
      throw new Error('body é um campo obrigatório');
    }
  }
}