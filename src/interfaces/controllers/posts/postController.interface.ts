import {Request} from "express";

import {ResponseType} from "../../../types/response.type.js";

export interface IPostController {
  create(req: Request): Promise<ResponseType>;
}
