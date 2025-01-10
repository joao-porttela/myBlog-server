import {User} from "../../01/entities/user.entity.js";
import {Category} from "../../01/entities/category.entity.js";
import {SubCategory} from "../../01/entities/subcategory.entity.js";
import {Tag} from "../../01/entities/tag.entity.js";

export type CreatePost = {
  id: string;
  title: string;
  content: string;
  author: User;
  published: boolean;
  updatedAt?: Date;
  tags?: Tag[];
  categories?: Category;
  subCategory?: SubCategory;
};
