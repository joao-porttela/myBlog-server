import { Prisma } from "../prisma.client.js";
export class PrismaUsersRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUser) {
        const userDb = await this.prisma.user.create({
            data: {
                email: createUser.email,
                password: createUser.password,
                username: createUser.username,
            },
        });
        if (!userDb)
            return null;
        return userDb;
    }
    async getAll() {
        const usersDb = await this.prisma.user.findMany();
        return usersDb;
    }
    async findById(id) {
        const userDb = await this.prisma.user.findUnique({ where: { id } });
        if (!userDb)
            return null;
        return userDb;
    }
    async findByEmail(email) {
        const userDb = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!userDb)
            return null;
        return userDb;
    }
    async findByUsername(username) {
        const userDb = await this.prisma.user.findUnique({ where: { username } });
        if (!userDb)
            return null;
        return userDb;
    }
    async deleteUser(id) {
        await this.prisma.user.delete({
            where: {
                id,
            },
        });
        return "User successfully deleted";
    }
}
export const prismaUsersRepository = new PrismaUsersRepository(Prisma);
