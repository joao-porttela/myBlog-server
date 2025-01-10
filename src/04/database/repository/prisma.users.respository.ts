/**
 *
 * TODO
 * Add error handling messages for the different scenarios, e.g, create user (if an email or username is already being used), or user not found
 *
 */

import {Prisma} from "../prisma.client.js";

// Interface
import {IPrismaUsersRepository} from "../../../interfaces/prisma-user-repository.interface.js";

// Infrastructure
import {User} from "@prisma/client"; // User Model

// DTO
import {CreatePrismaUser} from "../../../interfaces/dtos/create-prisma-user.dto.js";

export class PrismaUsersRepository implements IPrismaUsersRepository {
  constructor(private readonly prisma: typeof Prisma) {}

  async create(createUser: CreatePrismaUser): Promise<User | null> {
    const userDb = await this.prisma.user
      .create({
        data: {
          email: createUser.email,
          password: createUser.password,
          username: createUser.username,
          role: createUser.role,
        },
      })
      .catch((err: Error) => {
        console.log(err);

        return null;
      });

    if (!userDb) return null;

    return userDb;
  }

  async getAll(): Promise<User[] | null> {
    const usersDb = await this.prisma.user.findMany({
      select: {
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });

    return usersDb;
  }

  async findById(id: string): Promise<User | null> {
    const userDb = await this.prisma.user.findUnique({where: {id}});

    if (!userDb) return null;

    return userDb;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDb = await this.prisma.user
      .findUnique({
        where: {email},
      })
      .catch(() => null);

    if (!userDb) return null;

    return userDb;
  }

  async findByUsername(username: string): Promise<User | null> {
    const userDb = await this.prisma.user.findUnique({where: {username}});

    if (!userDb) return null;

    return userDb;
  }

  async deleteUser(id: string): Promise<string> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return "User successfully deleted";
  }
}

export const prismaUsersRepository = new PrismaUsersRepository(Prisma);
