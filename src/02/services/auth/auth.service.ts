import jwt from "jsonwebtoken";

// Interfaces
import {IAuthService} from "../../../struct/interfaces/services/auth/authService.interface.js";

// Types
import {IUser} from "../../../struct/types/entities/user.type.js";

const key = process.env.PRIVATE_KEY;

export class AuthService implements IAuthService {
  public async generateToken(id: string, user: IUser): Promise<string> {
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
