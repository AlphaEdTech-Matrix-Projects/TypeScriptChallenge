import { IUser } from "../interfaces/interfaces";
import UserRepository from "../repositories/UserRepository";

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getUserById(id: string): Promise<IUser> {
    try {

      return await this.userRepository.getUserById(id);

    } catch (exception: any) {
      throw exception;
    }
  }
}
