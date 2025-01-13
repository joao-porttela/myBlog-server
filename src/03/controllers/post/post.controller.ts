import {Request} from "express";
import {slug as sl} from "github-slugger";

// DI
import {postRepository} from "../../../04/database/repository/post.repository.js";
import {categoryRepository} from "../../../04/database/repository/category.repository.js";
import {subCategoryRepository} from "../../../04/database/repository/subcategory.repository.js";
import {tagRepository} from "../../../04/database/repository/tag.repository.js";

// Interfaces
import {IPostController} from "../../../interfaces/controllers/posts/postController.interface.js";
import {IPostRepository} from "../../../interfaces/repo/posts/post-repository.interface.js";
import {ICategoryRepository} from "../../../interfaces/repo/posts/category-repository.interface.js";
import {ISubCategoryRepository} from "../../../interfaces/repo/posts/subCategory-repository.interface.js";
import {ITagRepository} from "../../../interfaces/repo/posts/tag-repository.interface.js";

// Types
import {ResponseType} from "../../../types/response.type.js";

// DTO
import {CreatePostDTO} from "../../../types/dtos/post/create-post.dto.js";
import {ITag} from "../../../types/entities/tag.type.js";

export class PostController implements IPostController {
  private postRepository: IPostRepository = postRepository;

  // Create the repos
  private categoryRepository: ICategoryRepository = categoryRepository;
  private subCategoryRepository: ISubCategoryRepository = subCategoryRepository;
  private tagRepository: ITagRepository = tagRepository;
  //

  public async create(req: Request): Promise<ResponseType> {
    try {
      /**
       * TODO
       *
       * Create functions for each repo to handle find and create requests * accordingly
       */
      // Category Logic
      let categoryId: string | null = null;
      if (req.body.category) {
        const existingCategory = await this.categoryRepository.find({
          name: req.body.category,
          userId: req.body.authorId,
        });
        if (existingCategory) {
          categoryId = existingCategory.id;
        } else {
          const newCategory = await this.categoryRepository.create({
            name: req.body.category,
            userId: req.body.authorId,
          });
          categoryId = newCategory.id;
        }
      }

      // SubCategory Logic
      let subCategoryId: string | null = null;
      if (req.body.subCategory) {
        const existingSubCategory = await this.subCategoryRepository.find({
          name: req.body.subCategory,
          userId: req.body.userId,
          categoryId: req.body.req.body.category,
        });
        if (existingSubCategory) {
          subCategoryId = existingSubCategory.id;
        } else {
          const newSubCategory = await subCategoryRepository.create({
            name: req.body.subCategory,
            userId: req.body.authorId,
            categoryId: categoryId!,
          });
          subCategoryId = newSubCategory.id;
        }
      }

      // Tags Logic
      const tagIds: ITag[] = [];
      if (Array.isArray(req.body.tags) && req.body.tags.length > 0) {
        for (const tagName of req.body.tags) {
          const existingTag = await this.tagRepository.find(tagName);
          if (existingTag) {
            tagIds.push(existingTag);
          } else {
            const newTag = await this.tagRepository.create({
              name: tagName,
              slug: sl(tagName),
            });
            tagIds.push(newTag);
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
      console.error("Error creating post:", error);
      return {
        statusCode: 500,
        status: "Fail",
        message: "Internal server error.",
        error: true,
      };
    }
  }
}
