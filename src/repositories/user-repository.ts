import UserSchema, { IUser } from 'models/user-model';

export default class UserRepository {
  private userSchema = UserSchema;

  public async createUser(user: IUser): Promise<IUser | void> {
    return await this.userSchema.create(user);
  }

  public async getUserByName(username: string): Promise<IUser | null> {
    return await UserSchema.findOne({
      username
    });
  }

  public async getUserById(id: string): Promise<any> {
    return await UserSchema.findById(id).lean();
  }

  public async updateUserById(id: string, payload: any): Promise<any> {
    return await UserSchema.findOneAndUpdate({
      '_id': id
    }, {
      $set: payload
    }, {
      new: true
    }).lean();
  }

  public async deleteUserById(id: string): Promise<any> {
    return await UserSchema.deleteOne({
      '_id': id
    }).lean();
  }
}