import {Request} from "express";
import * as bcrypt from "bcrypt";

// DI
import {AuthService, authService} from "../../../02/services/auth/auth.service.js";
import {UserService, userService} from "../../../02/services/user/user.service.js";
import {
  PrismaUsersRepository,
  prismaUsersRepository,
} from "../../../04/database/repository/prisma.users.respository.js";

// DTO
import {CreatePrismaUser} from "../../../interfaces/dtos/create-prisma-user.dto.js";

// Type
import {ResponseType} from "../../../types/response.type.js";
import {Role} from "../../../interfaces/enum/Role.js";
import {getRole} from "../../../helper/role.js";

export class AuthController {
  private authService: AuthService = authService;
  private userService: UserService = userService;
  private prismaRepository: PrismaUsersRepository = prismaUsersRepository;

  public async signUp(req: Request): Promise<ResponseType> {
    const hashedPassword = await bcrypt.hash(String(req.body.password), 10);
    const isValidEmailFormat = this.authService.validateEmail(req.body.email);

    if (!isValidEmailFormat)
      return {
        statusCode: 400,
        status: "Fail",
        message: "Invalid email format",
        error: true,
      };

    const role: string | "Not Authorised" = getRole(req.body.role);

    if (role === "Not Authorised")
      return {
        statusCode: 400,
        status: "Fail",
        message: role,
        error: true,
      };

    // createUser object
    const createUser: CreatePrismaUser = {
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      role: role,
    };

    // Get user from DB
    const userDb = await this.prismaRepository.create(createUser);

    // If no userDb we return a message saying that something went wrong.
    // It was not able to sign up user
    if (!userDb)
      return {
        statusCode: 500,
        status: "Fail",
        message: "Something went wrong!",
        error: true,
      };

    // Create User Entity using userService
    const user = await this.userService.create({
      id: userDb.id,
      name: userDb.username,
      email: userDb.email,
      role: userDb.role === "ADMIN" ? Role[Role.ADMIN] : Role[Role.USER],
    });

    // Generate user payload
    const payload = await this.authService.generateToken(user.id, user);

    return {
      statusCode: 200,
      status: "Success",
      message: {
        user,
        payload,
      },
      error: false,
    };
  }

  public async login(req: Request): Promise<ResponseType> {
    try {
      // Find db user
      const userDb = await this.prismaRepository.findByEmail(req.body.email);

      if (!userDb)
        return {
          statusCode: 500,
          status: "Fail",
          message: "Incorrect details.",
          error: true,
        };

      // Check if passwords matches
      const passMatch = await bcrypt.compare(req.body.password, userDb.password);

      if (!passMatch)
        return {
          statusCode: 400,
          status: "Fail",
          message: "Incorrect details.",
          error: true,
        };

      // Create User Entity using userService
      const user = await this.userService.create({
        id: userDb.id,
        name: userDb.username,
        email: userDb.email,
        role: userDb.role === "ADMIN" ? Role[Role.ADMIN] : Role[Role.USER],
      });

      // Generate user payload
      const payload = await this.authService.generateToken(user.id, user);

      return {
        statusCode: 200,
        status: "Success",
        message: {
          user,
          payload,
        },
        error: false,
      };
    } catch (err) {
      console.log(err);

      return {
        statusCode: 200,
        status: "Success",
        message: err,
        error: false,
      };
    }
  }
}
