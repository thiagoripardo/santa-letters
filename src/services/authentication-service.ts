import { User } from 'models/user-model';
import UserRepository from 'repositories/user-repository';

export default class AuthenticationService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async signup(user: User): Promise<any> {
    this.validate(user);
    await this.userRepository.createUser(user);
    return {
      message: `User ${user.name} was created`,
    }
  }

  public getUserRepository(): UserRepository {
    return this.userRepository;
  }

  validate(user: User): void {
    const {
      email,
      name,
      password,
    } = user;

    if (!email) {
      throw new Error('email é um campo obrigatório');
    }

    if (!name) {
      throw new Error('name é um campo obrigatório');
    }

    if (!password) {
      throw new Error('password é um campo obrigatório');
    }
  }
}