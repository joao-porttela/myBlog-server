import {Request} from "express";

import {ResponseType} from "../../../types/response.type.js";

export interface IUserController {
  findUserById(req: Request): Promise<ResponseType>;
  getUsers(): Promise<ResponseType>;
  deleteUser(req: Request): Promise<ResponseType>;
}
