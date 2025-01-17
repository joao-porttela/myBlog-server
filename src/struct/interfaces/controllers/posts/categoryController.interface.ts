import {Request} from "express";
import {ResponseType} from "../../../types/response.type.js";
export interface ICategoryController {
  create(req: Request): Promise<ResponseType>;
  findManyByAuthorId(req: Request): Promise<ResponseType>;
  findById(req: Request): Promise<ResponseType>;
}
