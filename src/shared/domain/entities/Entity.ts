import type { Id } from "../value-objects/Id.js";

export abstract class Entity {
  constructor(
    private readonly _id: Id,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {}

  get id(): Id {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
