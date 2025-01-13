import {ITag} from "../../entities/tag.type.js";

export type CreatePostDTO = {
  slug: string;
  title: string;
  content: string;
  published: string;
  authorId: string;
  categoryId: string | null;
  subCategoryId: string | null;
  tags: ITag[];
};
