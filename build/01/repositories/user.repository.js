import { User } from "../entities/user.entity.js";
class UserRepository {
    constructor() { }
    create(user) {
        return new User(user.id, user.username, user.email);
    }
}
export const userRepository = new UserRepository();
