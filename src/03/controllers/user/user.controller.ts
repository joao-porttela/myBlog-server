import {Request} from "express";

// DI
import {UserService, userService} from "../../../02/services/user/user.service.js";
import {userRepository} from "../../../04/database/repository/users.respository.js";

// Interfaces
import {IUserRepository} from "../../../struct/interfaces/repo/user/user-repository.interface.js";

import {IUserController} from "../../../struct/interfaces/controllers/user/userController.interface.js";

// Type
import {ResponseType} from "../../../struct/types/response.type.js";
import {Role} from "../../../struct/interfaces/enum/Role.js";

export class UserController implements IUserController {
  private userService: UserService = userService;
  private userRepository: IUserRepository = userRepository;

  public async findUserById(req: Request): Promise<ResponseType> {
    // Find db user
    const userDb = await this.userRepository.findById(req.body.id);

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
      createdAt: userDb.createdAt,
      updatedAt: userDb.updatedAt || undefined,
    });

    return {
      statusCode: 200,
      status: "Success",
      message: user,
      error: false,
    };
  }

  public async getUsers(): Promise<ResponseType> {
    const usersDb = await this.userRepository.getAll();

    return {
      statusCode: 200,
      status: "Success",
      message: usersDb,
      error: false,
    };
  }

  public async deleteUser(req: Request): Promise<ResponseType> {
    const message = await this.userRepository.deleteUser(req.body.id);

    return {
      statusCode: 200,
      status: "Success",
      message: message,
      error: false,
    };
  }
}
