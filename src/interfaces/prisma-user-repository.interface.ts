import {User} from "@prisma/client";

// DTO
import {CreateUser} from "./dtos/create-prisma-user.dto.js";

export interface IPrismaUsersRepository {
  create(user: CreateUser): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
