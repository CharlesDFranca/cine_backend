import type { Id } from "../value-objects/Id.js";

export abstract class Entity {
  constructor(private readonly _id: Id) {}

  get id(): Id {
    return this._id;
  }
}
