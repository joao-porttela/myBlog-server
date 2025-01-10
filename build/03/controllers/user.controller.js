import * as bcrypt from "bcrypt";
import { userService } from "../../02/services/user.service.js";
import { prismaUsersRepository, } from "../../04/database/repository/prisma.users.respository.js";
export class UserController {
    userService = userService;
    prismaRepository = prismaUsersRepository;
    constructor() { }
    async signUp(req) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const createUser = {
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        };
        const userDb = await this.prismaRepository.create(createUser);
        if (!userDb)
            return {
                statusCode: 500,
                status: "Fail",
                message: "Something went wrong!",
                error: true,
            };
        const user = this.userService.create({
            id: userDb.id,
            username: userDb.username,
            email: userDb.email,
        });
        return {
            statusCode: 200,
            status: "Success",
            message: user,
            error: false,
        };
    }
    async login(req) {
        const userDb = await this.prismaRepository.findByEmail(req.body.email);
        if (!userDb)
            return {
                statusCode: 500,
                status: "Fail",
                message: "Incorrect details.",
                error: true,
            };
        const passMatch = await bcrypt.compare(userDb.password, req.body.password);
        if (!passMatch)
            return {
                statusCode: 400,
                status: "Fail",
                message: "Incorrect details.",
                error: true,
            };
        const user = this.userService.create({
            id: userDb.id,
            username: userDb.username,
            email: userDb.email,
        });
        return {
            statusCode: 200,
            status: "Success",
            message: user,
            error: false,
        };
    }
    async findUserById(req) {
        const userDb = await this.prismaRepository.findById(req.body.id);
        if (!userDb)
            return {
                statusCode: 404,
                status: "Fail",
                message: "User not found.",
                error: true,
            };
        const user = this.userService.create({
            id: userDb.id,
            username: userDb.username,
            email: userDb.email,
        });
        return {
            statusCode: 200,
            status: "Success",
            message: user,
            error: false,
        };
    }
    async getUsers(req) {
        const usersDb = await this.prismaRepository.getAll();
        return {
            statusCode: 200,
            status: "Success",
            message: usersDb,
            error: false,
        };
    }
    async deleteUser(req) {
        const message = await this.prismaRepository.deleteUser(req.body.id);
        return {
            statusCode: 200,
            status: "Success",
            message: message,
            error: false,
        };
    }
}
