import {User} from "@prisma/client";

// DTO
import {CreatePrismaUserDTO} from "../../../types/dtos/user/create-prisma-user.dto.js";

export interface IUserRepository {
  create(user: CreatePrismaUserDTO): Promise<User | null>;
  getAll(): Promise<User[] | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  deleteUser(id: string): Promise<string>;
}
