import LetterSchema, { Letter } from 'models/letter-model'

export default class LetterRepository {
  private letterSchema = LetterSchema;

  public async createLetter(letter: Letter): Promise<void> {
    return await this.letterSchema.create(letter);
  }

  public async getLetters(): Promise<void> {
    return await this.letterSchema.find({});
  }

  public async getLetterById(id: String): Promise<void> {
    return await this.letterSchema.findById(id);
  }

  public async updateLetterById(id: String, letter: Letter): Promise<void> {
    return await this.letterSchema.updateOne({
      '_id': String(id)
    }, {
      $set: letter
    });
  }

  public async deleteLetterById(id: String): Promise<void> {
    return await this.letterSchema.deleteOne({
      '_id': id
    });
  }
}