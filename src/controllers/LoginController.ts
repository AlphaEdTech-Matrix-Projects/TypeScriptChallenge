import { Request, Response } from "express"

export default class LoginController {
    public async login(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({ message: 'ksadmkaskld' })
        } catch (error) {
            
        }
    }

    public async logout(req: Request, res: Response): Promise<void> {
        try {
            
        } catch (error) {
            
        }
    }
};