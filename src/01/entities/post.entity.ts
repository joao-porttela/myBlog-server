import {User} from "./user.entity.js";
import {Category} from "./category.entity.js";
import {SubCategory} from "./subcategory.entity.js";
import {Tag} from "./tag.entity.js";

export class Post {
  public readonly createdAt?: Date

  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public readonly author: User,
    public published: boolean,
    public readonly updatedAt?: Date,
    public readonly tags?: Tag[],
    public readonly categories?: Category,
    public readonly subCategory?: SubCategory
  ) {}
}
