import jwt from "jsonwebtoken";
import {User} from "../../01/entities/user.entity.js";

const key = process.env.PRIVATE_KEY;

export class AuthService {
  constructor() {}

  public async generateToken(id: string, user: User): Promise<string> {
    const payload = {user, sub: id};

    if (!key) return "error";

    return jwt.sign(payload, key, {expiresIn: "90 days", algorithm: "RS256"});
  }

  public validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  }
}

export const authService = new AuthService();
