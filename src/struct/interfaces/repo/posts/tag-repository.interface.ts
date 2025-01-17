import {Tag} from "@prisma/client";

export interface ITagRepository {
  create(tag: {name: string; slug: string}): Promise<Tag | null>;
  find(name: string): Promise<Tag | null>;
}
