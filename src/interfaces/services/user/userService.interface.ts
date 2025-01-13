import {User} from "../../../01/entities/user.entity.js";
import {IUser} from "../../../types/entities/user.type.js";

export interface IUserService {
  create(user: IUser): Promise<User>;
}
