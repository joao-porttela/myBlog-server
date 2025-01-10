import {Post} from "./post.entity.js";
import {SubCategory} from "./subcategory.entity.js";

export class Category {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public subCategory?: SubCategory[],
    public posts?: Post[]
  ) {}
}
