import {Request} from "express";

// DI
import {UserService, userService} from "../../../02/services/user/user.service.js";
import {
  PrismaUsersRepository,
  prismaUsersRepository,
} from "../../../04/database/repository/prisma.users.respository.js";

// Type
import {ResponseType} from "../../../types/response.type.js";
import {Role} from "../../../interfaces/enum/Role.js";

export class UserController {
  private userService: UserService = userService;
  private prismaRepository: PrismaUsersRepository = prismaUsersRepository;

  public async findUserById(req: Request): Promise<ResponseType> {
    // Find db user
    const userDb = await this.prismaRepository.findById(req.body.id);

    if (!userDb)
      return {
        statusCode: 404,
        status: "Fail",
        message: "User not found.",
        error: true,
      };

    // Create User Entity using userService
    const user = this.userService.create({
      id: userDb.id,
      name: userDb.username,
      email: userDb.email,
      role: userDb.role === "ADMIN" ? Role[Role.ADMIN] : Role[Role.USER],
    });

    return {
      statusCode: 200,
      status: "Success",
      message: user,
      error: false,
    };
  }

  public async getUsers(): Promise<ResponseType> {
    const usersDb = await this.prismaRepository.getAll();

    return {
      statusCode: 200,
      status: "Success",
      message: usersDb,
      error: false,
    };
  }

  public async deleteUser(req: Request): Promise<ResponseType> {
    const message = await this.prismaRepository.deleteUser(req.body.id);

    return {
      statusCode: 200,
      status: "Success",
      message: message,
      error: false,
    };
  }
}
