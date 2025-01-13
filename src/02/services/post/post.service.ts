// DOMAIN
import {Post} from "../../../01/entities/post.entity.js"; // Entity

// Interface
import {IPostService} from "../../../interfaces/services/posts/postService.interface.js";

// Types
import {IPost} from "../../../types/entities/post.type.js";

export class PostService implements IPostService {
  async create(post: IPost): Promise<IPost> {
    return new Post(
      post.id,
      post.slug,
      post.title,
      post.authorId,
      post.published,
      post.createdAt,
      post.content,
      post.updatedAt,
      post.tags,
      post.categoryId,
      post.subCategoryId
    );
  }
}

export const postService = new PostService();
