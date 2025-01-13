import {ITag} from "../../types/entities/tag.type.js";

export class Tag implements ITag {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
