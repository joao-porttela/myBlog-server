import {Request} from "express";

import {ResponseType} from "../../../types/response.type.js";

export interface IPostController {
  create(req: Request): Promise<ResponseType>;
  findById(req: Request): Promise<ResponseType>;
  getUserPosts(req: Request): Promise<ResponseType>;
  update(req: Request): Promise<ResponseType>;
  delete(req: Request): Promise<ResponseType>;
}
