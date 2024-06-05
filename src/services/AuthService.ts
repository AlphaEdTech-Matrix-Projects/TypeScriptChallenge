import UserRepository from "../repositories/UserRepository";
import { UsernameOrPasswordIncorrectException } from "../utils/Exception";
import JwtTokenService from "../utils/JwtTokenService";
import { Message } from "../utils/Message";
import BcryptService from "./BcryptService";

export default class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.getUserAllDataByUsername(username);

    if (!user) {
      throw new UsernameOrPasswordIncorrectException(
        Message.USERNAME_OR_PASSWORD_INCORRECT
      );
    }

    if (!(await BcryptService.compare(password, user.password || ""))) {
      throw new UsernameOrPasswordIncorrectException(
        Message.USERNAME_OR_PASSWORD_INCORRECT
      );
    }

    const token = JwtTokenService.create({ user_id: user.id });

    return token;
  }
}
