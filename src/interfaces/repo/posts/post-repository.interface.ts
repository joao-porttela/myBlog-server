import {Post} from "@prisma/client";

export interface IPostRepository {
  create(createPost): Promise<Post | null>;
}
