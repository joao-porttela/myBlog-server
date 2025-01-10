// DOMAIN
import {User} from "../../../01/entities/user.entity.js"; // Entity

// Interface
import {CreateUser} from "../../../interfaces/dtos/create-user.dto.js";

export class UserService {
  constructor() {}

  async create(user: CreateUser): Promise<User> {
    return new User(user.id, user.name, user.email, user.role);
  }
}

export const userService = new UserService();
