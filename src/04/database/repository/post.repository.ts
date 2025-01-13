import {Prisma} from "../prisma.client.js";
import {Post} from "@prisma/client";

// Interface
import {IPostRepository} from "../../../interfaces/repo/posts/post-repository.interface.js";

// DTO
import {CreatePostDTO} from "../../../types/dtos/post/create-post.dto.js";

export class PostRepository implements IPostRepository {
  constructor(private readonly prisma: typeof Prisma) {}

  async create(post: CreatePostDTO): Promise<Post | null> {
    try {
      const postDb = await this.prisma.post.create({
        data: {
          slug: post.slug,
          title: post.title,
          content: post.content,
          published: post.published,
          authorId: post.authorId,
          categoryId: post.categoryId || null,
          subCategoryId: post.subCategoryId || null,
          tags: {
            connect: post.tags.map((tag) => ({id: tag.id})),
          },
        },
      });

      return postDb;
    } catch (err) {
      console.error("Error creating post:", err);
      return null;
    }
  }
}

export const postRepository = new PostRepository(Prisma);
