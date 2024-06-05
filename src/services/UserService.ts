import { IUser } from "../interfaces/interfaces";
import UserRepository from "../repositories/UserRepository";
import { ForbiddenException, NotFoundException, UnauthorizedException } from "../utils/Exception";
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
  ): Promise<IUser> {
    
    let oldUser;
   
    if (logedUser.isAdmin !== true){
      oldUser = await this.userRepository.getUserById(logedUser.id);
    }else{
     oldUser = await this.userRepository.getUserById(id);
    }
    if (!oldUser) {
      throw new NotFoundException("Usuário não encontrado");
    }
    if(fields.email){
      const oldEmail = await this.userRepository.getUserByEmail(fields.email);
      if(oldEmail){
        throw new ForbiddenException("Email já utilizado");
      }
    }    
    if(fields.squadId && logedUser.isAdmin !== true){
      throw new UnauthorizedException("Você não tem permissão para essa ação");
    }
    if(fields.isAdmin && logedUser.isAdmin !== true){
      throw new UnauthorizedException("Você não tem permissão para essa ação");
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

    return await this.userRepository.updateUserById(id, newUser);
  }
 
  public async deleteUserById(id: string,logedUser): Promise<IUser> {
    if(logedUser.isAdmin !== true){
      throw new UnauthorizedException("Você não tem permissão para essa ação");
    }
    const deletedUser = await this.userRepository.getUserById(id);
    if(!deletedUser){
      throw new NotFoundException("Usuário não encontrado");
    }
    return await this.userRepository.deleteUserById(deletedUser);
  }


}