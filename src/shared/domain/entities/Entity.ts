import { InvalidTimestampError } from "../errors/InvalidTimestampError.js";
import type { Id } from "../value-objects/Id.js";

export abstract class Entity {
  constructor(
    private readonly _id: Id,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {
    if (this._createdAt.getTime() > this._updatedAt.getTime()) {
      throw new InvalidTimestampError(
        "A data de criação não pode estar a frente da data de atualização",
        {
          errorClass: this.constructor.name,
        },
      );
    }
  }

  get id(): Id {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  touch() {
    this._updatedAt = new Date();
  }
}
