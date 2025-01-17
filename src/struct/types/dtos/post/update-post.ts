export interface IUpdatePost {
  slug?: string;
  title?: string;
  content?: string;
  published: boolean;
  categoryId: string | null;
  subCategoryId?: string | null;
  tags: string[] | [];
}
