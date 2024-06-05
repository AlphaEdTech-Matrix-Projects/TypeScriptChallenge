import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { IUser } from "../interfaces/interfaces";
import JwtTokenService from "../services/JwtTokenService";

declare global {
  namespace Express {
    interface Request {
      authUser: IUser;
    }
  }
}

export default async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies["token"];

    if (token) {
      const tokenVerify = (await JwtTokenService.verify(token)) as {
        user_id: string;
      };

      const user = await new UserRepository().getUserById(tokenVerify.user_id);

      if (user) {
        req.authUser = user;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}
