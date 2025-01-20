import {Request} from "express";
import {slug as sl} from "github-slugger";

// DI
import {postRepository} from "../../../04/database/repository/post.repository.js";
import {categoryRepository} from "../../../04/database/repository/category.repository.js";
import {subCategoryRepository} from "../../../04/database/repository/subcategory.repository.js";
import {tagRepository} from "../../../04/database/repository/tag.repository.js";

// Interfaces
import {IPostController} from "../../../struct/interfaces/controllers/posts/postController.interface.js";
import {IPostRepository} from "../../../struct/interfaces/repo/posts/post-repository.interface.js";
import {ICategoryRepository} from "../../../struct/interfaces/repo/posts/category-repository.interface.js";
import {ISubCategoryRepository} from "../../../struct/interfaces/repo/posts/subCategory-repository.interface.js";
import {ITagRepository} from "../../../struct/interfaces/repo/posts/tag-repository.interface.js";

// Types
import {ResponseType} from "../../../struct/types/response.type.js";

// DTO
import {CreatePostDTO} from "../../../struct/types/dtos/post/create-post.dto.js";
import {ITag} from "../../../struct/types/entities/tag.type.js";
import {IUpdatePost} from "../../../struct/types/dtos/post/update-post.dto.js";

export class PostController implements IPostController {
  private postRepository: IPostRepository = postRepository;
  private categoryRepository: ICategoryRepository = categoryRepository;
  private subCategoryRepository: ISubCategoryRepository = subCategoryRepository;
  private tagRepository: ITagRepository = tagRepository;

  public async create(req: Request): Promise<ResponseType> {
    try {
      // Category Logic
      let categoryId: string | null = null;
      if (req.body.category.id) {
        const existingCategory = await this.categoryRepository.findById(
          req.body.category.id
        );

        if (existingCategory) {
          categoryId = existingCategory.id;
        } else {
          const newCategory = await this.categoryRepository.create({
            name: req.body.category.name,
            authorId: req.body.authorId,
          });

          if (!newCategory) throw new Error();

          categoryId = newCategory.id;
        }
      } else {
        if (req.body.category.name != "") {
          const newCategory = await this.categoryRepository.create({
            name: req.body.category.name,
            authorId: req.body.authorId,
          });

          if (!newCategory) throw new Error();

          categoryId = newCategory.id;
        }
      }

      // SubCategory Logic
      let subCategoryId: string | null = null;
      if (req.body.subCategory.id) {
        const existingSubCategory = await this.subCategoryRepository.findById(
          req.body.subCategory.id
        );

        if (existingSubCategory) {
          subCategoryId = existingSubCategory.id;
        } else {
          const newSubCategory = await subCategoryRepository.create({
            name: req.body.subCategory.name,
            authorId: req.body.authorId,
            categoryId: categoryId!,
          });

          if (!newSubCategory) throw new Error();

          subCategoryId = newSubCategory.id;
        }
      } else {
        if (req.body.subCategory.name != "") {
          const newSubCategory = await subCategoryRepository.create({
            name: req.body.subCategory.name,
            authorId: req.body.authorId,
            categoryId: categoryId!,
          });

          if (!newSubCategory) throw new Error();

          subCategoryId = newSubCategory.id;
        }
      }

      // Tags Logic
      const tagIds: string[] = [];
      if (Array.isArray(req.body.tags) && req.body.tags.length > 0) {
        for (const tagName of req.body.tags) {
          const existingTag = await this.tagRepository.find(tagName);
          if (existingTag) {
            tagIds.push(existingTag.id);
          } else {
            const newTag = await this.tagRepository.create({
              name: tagName,
              slug: sl(tagName),
            });

            if (!newTag) throw new Error();

            tagIds.push(newTag.id);
          }
        }
      }

      // Create Post DTO
      const body: CreatePostDTO = {
        slug: sl(req.body.title),
        title: req.body.title,
        content: req.body.content,
        published: req.body.published || false,
        authorId: req.body.authorId,
        categoryId,
        subCategoryId,
        tags: tagIds,
      };

      // Create Post in DB
      const postDb = await this.postRepository.create(body);

      if (!postDb) {
        return {
          statusCode: 500,
          status: "Fail",
          message: "Something went wrong. Post creation unsuccessful.",
          error: true,
        };
      }

      return {
        statusCode: 200,
        status: "Success",
        message: "Post created successfully.",
        error: false,
      };
    } catch (error) {
      console.error(`POST CONTROLER | CREATE ERROR: ${error}`);
      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal server error.",
        error: true,
      };
    }
  }

  public async getUserPosts(req: Request): Promise<ResponseType> {
    try {
      const data = {
        authorId: req.body.authorId,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
      };

      const postsDb = await this.postRepository.getUserPosts(data);

      return {
        statusCode: 200,
        status: "Success",
        message: postsDb,
        error: false,
      };
    } catch (error) {
      console.error(`POST CONTROLLER | GET ALL ERROR: ${error}`);
      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal server error.",
        error: true,
      };
    }
  }

  public async findById(req: Request): Promise<ResponseType> {
    try {
      const postDb = await this.postRepository.findById(req.body.id);
      return {
        statusCode: 200,
        status: "Success",
        message: postDb,
        error: false,
      };
    } catch (error) {
      console.error(`POST CONTROLLER | GET ERROR: ${error}`);
      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal server error.",
        error: true,
      };
    }
  }

  public async update(req: Request): Promise<ResponseType> {
    try {
      // Category Logic
      let categoryId: string | null = null;
      if (req.body.updatePost.category.id) {
        const existingCategory = await this.categoryRepository.findById(
          req.body.updatePost.category.id
        );

        if (existingCategory) {
          categoryId = existingCategory.id;
        } else {
          const newCategory = await this.categoryRepository.create({
            name: req.body.updatePost.category.name,
            authorId: req.body.updatePost.authorId,
          });

          if (!newCategory) throw new Error();

          categoryId = newCategory.id;
        }
      } else {
        if (req.body.updatePost.category.name != "") {
          const newCategory = await this.categoryRepository.create({
            name: req.body.updatePost.category.name,
            authorId: req.body.updatePost.authorId,
          });

          if (!newCategory) throw new Error();

          categoryId = newCategory.id;
        }
      }

      // SubCategory Logic
      let subCategoryId: string | null = null;
      if (req.body.updatePost.subCategory.id) {
        const existingSubCategory = await this.subCategoryRepository.findById(
          req.body.updatePost.subCategory.id
        );

        if (existingSubCategory) {
          subCategoryId = existingSubCategory.id;
        } else {
          const newSubCategory = await subCategoryRepository.create({
            name: req.body.updatePost.subCategory.name,
            authorId: req.body.updatePost.authorId,
            categoryId: categoryId!,
          });

          if (!newSubCategory) throw new Error();

          subCategoryId = newSubCategory.id;
        }
      } else {
        if (req.body.updatePost.subCategory.name != "") {
          const newSubCategory = await subCategoryRepository.create({
            name: req.body.updatePost.subCategory.name,
            authorId: req.body.updatePost.authorId,
            categoryId: categoryId!,
          });

          if (!newSubCategory) throw new Error();

          subCategoryId = newSubCategory.id;
        }
      }

      // Tags Logic
      const tagIds: string[] = [];
      if (
        Array.isArray(req.body.updatePost.tags) &&
        req.body.updatePost.tags.length > 0
      ) {
        for (const tagName of req.body.updatePost.tags) {
          const existingTag = await this.tagRepository.find(tagName);
          if (existingTag) {
            tagIds.push(existingTag.id);
          } else {
            const newTag = await this.tagRepository.create({
              name: tagName,
              slug: sl(tagName),
            });

            if (!newTag) throw new Error();

            tagIds.push(newTag.id);
          }
        }
      }

      const updatedPost: IUpdatePost = {
        slug: sl(req.body.updatePost.title),
        title: req.body.updatePost.title,
        content: req.body.updatePost.content,
        published: req.body.updatePost.published || false,
        categoryId,
        subCategoryId,
        tags: tagIds,
      };

      await this.postRepository.update(req.body.id, updatedPost);

      return {
        statusCode: 200,
        status: "Success",
        message: "Post updated successfully",
        error: false,
      };
    } catch (error) {
      console.error(`POST CONTROLLER | UPDATE ERROR: ${error}`);
      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal server error.",
        error: true,
      };
    }
  }

  public async delete(req: Request): Promise<ResponseType> {
    try {
      await this.postRepository.delete(req.body.id);

      return {
        statusCode: 200,
        status: "Success",
        message: "Post deleted successfully",
        error: false,
      };
    } catch (error) {
      console.error(`POST CONTROLLER | DELETE ERROR: ${error}`);
      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal server error.",
        error: true,
      };
    }
  }
}
