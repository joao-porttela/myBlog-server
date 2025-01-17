import {IUser} from "../../struct/types/entities/user.type.js";

export class User implements IUser {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public readonly role: string,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date
  ) {}
}
