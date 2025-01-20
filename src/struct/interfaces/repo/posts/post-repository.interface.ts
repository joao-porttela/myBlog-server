import {Post} from "@prisma/client";
import {CreatePostDTO} from "../../../types/dtos/post/create-post.dto.js";
import {IUpdatePost} from "../../../types/dtos/post/update-post.dto.js";

export interface IPostRepository {
  create(createPost: CreatePostDTO): Promise<Post | null>;

  findById(id: string): Promise<Post | null>;

  getUserPosts({
    authorId,
    categoryId,
    subCategoryId,
  }: {
    authorId: string;
    categoryId?: string;
    subCategoryId?: string;
  }): Promise<Post[] | null>;

  update(id: string, updatePost: IUpdatePost): Promise<null>;

  delete(id: string): Promise<null>;
}
