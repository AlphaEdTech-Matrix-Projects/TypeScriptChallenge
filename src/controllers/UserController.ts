import { IUser } from "../interfaces/interfaces";
import { Request, Response } from "express";
import UserService from '../services/UserService';

export default class UserController {
    private userService: UserService;

    constructor() {
      this.userService = new UserService();
    }

    public async getMyUser(req: Request, res: Response): Promise<void> {
        try {
            const id: string = req.body.id;
            const user: IUser = await this.userService.getMyUser(id);

            res.status(200).json( user );
        } catch (error) {
            console.log(error);
            
            res.status(400).json({ message: 'deu ruim'})
        }
    }
    
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }

    public async getUserId(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }

    public async deleteuser(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
};