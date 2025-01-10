export class Tag {
  constructor(
    public readonly id: string,
    public name: string,
    public color: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
