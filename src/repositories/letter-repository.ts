import LetterSchema, { ILetter } from 'models/letter-model'

export default class LetterRepository {
  private letterSchema = LetterSchema;

  public async createLetter(letter: ILetter): Promise<ILetter | void> {
    return await this.letterSchema.create(letter);
  }

  public async getLetters(): Promise<ILetter[]> {
    return await this.letterSchema.find({}).lean();
  }

  public async getLetterById(id: String): Promise<ILetter | null> {
    return await this.letterSchema.findById(id).lean();
  }

  public async updateLetterById(id: String, letter: ILetter): Promise<any | void> {
    return await this.letterSchema.findOneAndUpdate({
      '_id': String(id)
    }, {
      $set: letter
    }, {
      new: true
    }).lean();
  }

  public async deleteLetterById(id: String): Promise<any | void> {
    return await this.letterSchema.deleteOne({
      '_id': id
    });
  }
}