// DTO
import {Category} from "../../../01/entities/category.entity.js";

// Entities
import {CreateCategoryDTO} from "../../../types/dtos/posts/create-category.dto.js";

export class CategoryService {
  async create(category: CreateCategoryDTO): Promise<Category> {
    return new Category(
      category.id,
      category.name,
      category.createdAt,
      category.updatedAt,
      category.subCategory,
      category.posts
    );
  }
}

export const categoryService = new CategoryService();

// id: string,
// name: string,
// readonly createdAt: Date,
// readonly updatedAt?: Date,
// subCategory?: SubCategory[],
// posts?: Post[]
//   ) {}
