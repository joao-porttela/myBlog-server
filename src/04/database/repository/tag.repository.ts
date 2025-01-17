import {Prisma} from "../prisma.client.js";
import {Tag} from "@prisma/client";
import {ITagRepository} from "../../../struct/interfaces/repo/posts/tag-repository.interface.js";

export class TagRepository implements ITagRepository {
  constructor(private readonly prisma: typeof Prisma) {}

  async create(tag: {name: string; slug: string}): Promise<Tag | null> {
    try {
      const tagDb = await this.prisma.tag.create({
        data: {
          name: tag.name,
          slug: tag.slug,
        },
      });

      return tagDb;
    } catch (error) {
      console.log(`TAG CREATE | ERROR: ${error}`);

      return null;
    }
  }

  async find(name: string): Promise<Tag | null> {
    try {
      const tagDb = await this.prisma.tag.findUnique({
        where: {
          name,
        },
      });

      return tagDb;
    } catch (error) {
      console.log(`TAG FIND | ERROR: ${error}`);
      return null;
    }
  }
}

export const tagRepository = new TagRepository(Prisma);
