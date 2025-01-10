// DOMAIN
import {Post} from "../../../01/entities/post.entity.js"; // Entity

// Interface
import {CreatePost} from "../../../interfaces/dtos/create-post.dto.js";

export class PostService {
  constructor() {}

  async create(post: CreatePost): Promise<Post> {
    return new Post(
      post.id,
      post.title,
      post.content,
      post.author,
      post.published,
      post.updatedAt,
      post.tags,
      post.categories,
      post.subCategory
    );
  }
}

export const userService = new PostService();
