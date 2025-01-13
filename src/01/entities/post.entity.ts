// Types
import {IPost} from "../../types/entities/post.type.js";
import {ICategory} from "../../types/entities/category.type.js";
import {ISubCategory} from "../../types/entities/subCategory.type.js";
import {ITag} from "../../types/entities/tag.type.js";
import {IUser} from "../../types/entities/user.type.js";

export class Post implements IPost {
  constructor(
    public readonly id: string,
    public readonly slug: string,
    public title: string,
    public readonly authorId: IUser,
    public published: boolean,
    public readonly createdAt: Date,
    public content: string | null,
    public readonly updatedAt: Date | null,
    public readonly tags: ITag[] | null,
    public readonly categoryId: ICategory | null,
    public readonly subCategoryId: ISubCategory | null
  ) {}
}
