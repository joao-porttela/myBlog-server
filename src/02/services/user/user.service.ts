// DOMAIN
import {User} from "../../../01/entities/user.entity.js"; // Entity

// Interfaces
import {IUserService} from "../../../interfaces/services/user/userService.interface.js";

// Types
import {IUser} from "../../../types/entities/user.type.js";

export class UserService implements IUserService {
  async create(user: IUser): Promise<User> {
    return new User(
      user.id,
      user.name,
      user.email,
      user.role,
      user.createdAt,
      user.updatedAt || undefined
    );
  }
}

export const userService = new UserService();
