import {Post} from "@prisma/client";
import {CreatePostDTO} from "../../../types/dtos/post/create-post.dto.js";

export interface IPostRepository {
  create(createPost: CreatePostDTO): Promise<Post | null>;

  findById(id: string): Promise<Post | null>;

  getUserPosts(authorId: string): Promise<Post[] | null>;

  update(id: string, updatePost:)

  delete(id: string): Promise<null>;
}
