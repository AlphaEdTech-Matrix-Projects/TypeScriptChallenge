import { Request } from "express";
import { UnauthorizedException } from "./Exception";

export default function AuthorizedNeed(req: Request) {
  if (!req.authUser) {
    throw new UnauthorizedException("Sem permissão");
  }
  return;
}
