import {IUser} from "../../../types/entities/user.type.js";

export interface IAuthService {
  generateToken(id: string, user: IUser): Promise<string>;
  validateEmail(email: string): boolean;
}
