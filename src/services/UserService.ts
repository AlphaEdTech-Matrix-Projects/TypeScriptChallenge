import { IUser } from "../interfaces/interfaces";
import UserRepository from "../repositories/UserRepository";

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getMyUser(id: string): Promise<IUser> {
    try {
      const user:IUser = await this.userRepository.getMyUser(id);
      return user;
    } catch (exception: any) {
      throw exception;
    }
  }
}