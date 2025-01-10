import {IUser} from "../../interfaces/user.interface.js";

export class User implements IUser {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public readonly role: string
  ) {}
}
