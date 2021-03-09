import { IUser } from 'models/user-model';
import UserRepository from 'repositories/user-repository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class AuthenticationService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getUserRepository(): UserRepository {
    return this.userRepository;
  }

  // public async createLetter(letter: ILetter): Promise<any> {
  //   this.validate(letter);
  //   return await this.letterRepository.createLetter(letter);
  // }

  public async signup(user: IUser): Promise<any> {
    this.validate(user);
    return await this.userRepository.createUser(user);
  }

  public async login(userLogin: IUser): Promise<any> {
    this.validate(userLogin);
    return await this.userRepository.getUserByName(userLogin.username).then(user => {
      if (!user || !user.comparePasswords(userLogin.password)) {
        return { message: 'Invalid username or password.' };
      }
      
      return {
        token: jwt.sign({ _id: user._id, username: user.username },
          process.env.JWT_SECRET as string,
          {
            expiresIn: 60 * 60 * 24 // expires in one day
          }),
      };
    }).catch(err => {
      console.error(err);
      throw err;
    });
  }

  validate(user: IUser): void {
    const {
      username,
      password,
    } = user;

    if (!username) {
      throw new Error('username é um campo obrigatório');
    }

    if (!password) {
      throw new Error('password é um campo obrigatório');
    }
  }
}