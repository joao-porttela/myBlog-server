import {Request} from "express";

import {ResponseType} from "../../../types/response.type.js";

export interface IAuthController {
  signUp(req: Request): Promise<ResponseType>;
  login(req: Request): Promise<ResponseType>;
}
