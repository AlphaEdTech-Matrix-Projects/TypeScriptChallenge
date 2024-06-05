import jwt from "jsonwebtoken";

interface IJwt {
  user_id: string;
}

export default class JwtTokenService {
  public static async verify(token: string) {
    return await jwt.verify(token, process.env.SECRET_KEY || "");
  }

  public static async create(data: IJwt) {
    return await jwt.sign(data, process.env.SECRET_KEY || "");
  }
}
