import { IUser } from 'models/user-model';
import UserRepository from 'repositories/user-repository';

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
      this.userRepository = new UserRepository();
  }

  public getUserRepository(): UserRepository {
    return this.userRepository;
  }

  public async createUser(user: IUser): Promise<any> {
    this.validate(user);
    return await this.userRepository.createUser(user);
  }

  public async getUserById(id: string): Promise<any> {
    return await this.userRepository.getUserById(id);
  }

  public async updateUserById(id: string, user: any): Promise<any> {
    return await this.userRepository.updateUserById(id, user);
  }

  public async deleteUserById(id: string): Promise<any> {
    return await this.userRepository.deleteUserById(id);
  }

  validate(user: IUser): void {
    const {
      username
    } = user;

    if (!username) {
      throw new Error('username é um campo obrigatório');
    }
  }
}