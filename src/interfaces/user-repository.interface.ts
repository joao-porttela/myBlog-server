import {User} from "../01/entities/user.entity.js";
import {CreateUser} from "./dtos/create-user.dto.js";

export interface IUserRepository {
  create(user: CreateUser): User;
}
