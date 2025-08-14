import { randomUUID } from "node:crypto";
import type { IIdGenerator } from "../domain/contracts/IIdGenerator.js";

export class IdGenerator implements IIdGenerator {
  constructor() {}

  use() {
    return randomUUID();
  }
}
