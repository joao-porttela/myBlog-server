import {Tag} from "@prisma/client";

export interface ITagRepository {
  create(): Promise<Tag | null>;
  find(): Promise<Tag | null>;
}
