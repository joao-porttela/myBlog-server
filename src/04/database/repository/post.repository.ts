import {Prisma} from "../prisma.client.js";
import {Post} from "@prisma/client";

// Interface
import {IPostRepository} from "../../../struct/interfaces/repo/posts/post-repository.interface.js";

// DTO
import {CreatePostDTO} from "../../../struct/types/dtos/post/create-post.dto.js";
import {IUpdatePost} from "../../../struct/types/dtos/post/update-post.js";

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
            connect: post.tags.map((tag) => ({id: tag})),
          },
        },
      });

      return postDb;
    } catch (err) {
      console.error(`POST RESPOSITORY | CREATE ERROR: ${err}`);
      return null;
    }
  }

  async findById(id: string): Promise<Post | null> {
    try {
      const postDb = await this.prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
          subCategory: true,
          tags: true,
        },
      });

      return postDb;
    } catch (error) {
      console.error(`POST RESPOSITORY | GET ERROR: ${error}`);
      return null;
    }
  }

  async getUserPosts(authorId: string): Promise<Post[] | null> {
    try {
      const postDb = await this.prisma.post.findMany({
        where: {
          authorId,
        },
        include: {
          tags: true,
        },
      });

      return postDb;
    } catch (err) {
      console.error(`POST RESPOSITORY | GET ALL ERROR: ${err}`);
      return null;
    }
  }

  async update(id: string, updatedPost: IUpdatePost) {
    try {
      await this.prisma.post
        .update({
          data: {
            slug: updatedPost.slug,
            title: updatedPost.title,
            content: updatedPost.content,
            published: updatedPost.published,
            categoryId: updatedPost.categoryId || null,
            subCategoryId: updatedPost.subCategoryId || null,
            tags: {
              connect: updatedPost.tags.map((tag) => ({id: tag})),
            },
          },
          where: {
            id,
          },
        })
        .catch((err) => {
          throw new Error(err);
        });

      return null;
    } catch (error) {
      console.log(`POST REPOSITORY | UPDATE ERROR: ${error}`);
      return null;
    }
  }

  async delete(id: string) {
    try {
      await this.prisma.post.delete({
        where: {id},
      })

      return null;
    } catch (error) {
      console.error(`POST RESPOSITORY | GET ALL ERROR: ${error}`);
      return null;
    }
  }
}

export const postRepository = new PostRepository(Prisma);
