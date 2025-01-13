import {Prisma, Tag} from "@prisma/client";
import {ITagRepository} from "../../../interfaces/repo/posts/tag-repository.interface.js";

export class TagRepository implements ITagRepository {
  constructor(private readonly prisma: typeof Prisma) {}

  async create(): Promise<Tag | null> {
    return null;
  }

  async find(): Promise<Tag | null> {
    return null;
  }
}

export const tagRepository = new TagRepository(Prisma);
