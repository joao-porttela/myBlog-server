import {IPost} from "../../../types/entities/post.type.js";

export interface IPostService {
  create(post: IPost): Promise<IPost>;
}
