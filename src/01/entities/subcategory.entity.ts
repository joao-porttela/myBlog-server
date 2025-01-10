import {Post} from "./post.entity.js";
import {Category} from "./category.entity.js";

export class SubCategory {
  constructor(
    public readonly id: string,
    public name: string,
    public category: Category,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public posts?: Post[]
  ) {}
}
