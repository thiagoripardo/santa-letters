import UserSchema, { User } from 'models/user-model';

export default class UserRepository {
  private userSchema = UserSchema;

  public async createUser(user: User): Promise<any> {
    return await this.userSchema.create(user);
  }

  public async findById(id: String): Promise<any> {
    return await UserSchema.find({}).lean();
  }

  public async update(payload: any): Promise<any> {
    return await UserSchema.updateOne({
      '_id': String(payload.id)
    }, {
      $set: payload
    });
  }

  public async delete(id: String): Promise<any> {
    return await UserSchema.deleteOne({
      '_id': id
    });
  }
}