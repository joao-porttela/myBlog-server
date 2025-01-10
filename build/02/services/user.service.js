import { userRepository } from "../../01/repositories/user.repository.js";
export class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(user) {
        return this.userRepository.create(user);
    }
}
export const userService = new UserService(userRepository);
