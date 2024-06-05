import { NextFunction, Request, Response } from "express";
import JwtTokenService from "../utils/JwtTokenService";
import UserRepository from "../repositories/UserRepository";
import { IUser } from "../interfaces/interfaces";

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
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (token) {
      const tokenVerify = (await JwtTokenService.verify(token)) as {
        user_id: string;
      };

      const user = await new UserRepository().getMyUser(tokenVerify.user_id);

      if (user) {
        req.authUser = user;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}
