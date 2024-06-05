import { IUser } from "../interfaces/interfaces";
import UserRepository from "../repositories/UserRepository";
import { ForbiddenException, NotFoundException, UnauthorizedException } from "../utils/Exception";
import { Message } from "../utils/Message";
import BcryptService from "./BcryptService";

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
  public async createUser(user: IUser): Promise<IUser> {
    user.password = await BcryptService.hash(String(user.password));
    return await this.userRepository.createUser(user);
  }

  public async updateUserById(
    id: string,
    fields: Partial<IUser>,
    logedUser: IUser
  ): Promise<IUser | null> {
    
    let oldUser;
   
    if (logedUser.isAdmin !== true && logedUser.id !== id){
      throw new ForbiddenException(Message.UNAUTHORIZED_ACTION)
    }else{
     oldUser = await this.userRepository.getUserById(id);
    }
    if (!oldUser) {
      throw new NotFoundException(Message.USER_NOT_FOUND);
    }
    if(fields.email){
      const oldEmail = await this.userRepository.getUserByEmail(fields.email);
      if(oldEmail){
        throw new ForbiddenException(Message.DUPLICATED_EMAIL);
      }
    }    
    if(fields.squadId && logedUser.isAdmin !== true){
      throw new UnauthorizedException(Message.UNAUTHORIZED_ACCESS);
    }
    if(fields.isAdmin && logedUser.isAdmin !== true){
      throw new UnauthorizedException(Message.UNAUTHORIZED_ACCESS);
    }
    
    const newUser:IUser = {
        id: oldUser.id,
        username: fields.username || oldUser.username,
        firstName: fields.firstName || oldUser.firstName,
        lastName: fields.lastName || oldUser.lastName,
        email: fields.email || oldUser.email,
        squadId: fields.squadId || oldUser.squadId,
        isAdmin: fields.isAdmin || oldUser.isAdmin,
      };

    return await this.userRepository.updateUserById({...newUser, id});
  }
 
  public async deleteUserById(id: string,logedUser:IUser): Promise<IUser | null> {
    if(logedUser.isAdmin !== true){
      throw new UnauthorizedException(Message.UNAUTHORIZED_ACTION);
    }
    const result = await this.userRepository.getUserById(id);

    if(!result){
      throw new NotFoundException(Message.USER_NOT_FOUND);
    }

    return await this.userRepository.deleteUserById(result);
  }

}