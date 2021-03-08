import { User } from 'models/user-model';
import UserRepository from 'repositories/user-repository';

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
      this.userRepository = new UserRepository();
  }

  public getUserRepository(): UserRepository {
    return this.userRepository;
  }

  validate(user: User): void {
    const {
      email,
      name,
    } = user;

    if (!email) {
      throw new Error('email é um campo obrigatório');
    }

    if (!name) {
      throw new Error('name é um campo obrigatório');
    }
  }
}