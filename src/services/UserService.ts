import { IUser } from "../interfaces/interfaces";
import UserRepository from "../repositories/UserRepository";

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getUserById(id: string): Promise<IUser | null> {
    return await this.userRepository.getUserById(id);
  }

  public async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.getAllUsers();
  }

  public async getUserAllDataByUsername(
    username: string
  ): Promise<IUser | null> {
    return await this.userRepository.getUserAllDataByUsername(username);
  }
}