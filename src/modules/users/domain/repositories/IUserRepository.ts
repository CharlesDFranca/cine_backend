import { Id } from "@/shared/domain/value-objects/Id";
import { User } from "../entities/User";
import { UserEmail } from "../value-objects/UserEmail";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(userId: Id): Promise<User | null>;
  findByEmail(userEmail: UserEmail): Promise<User | null>;
  existsByEmail(userEmail: UserEmail): Promise<boolean>;
  update(user: User): Promise<void>;
  delete(userId: Id): Promise<void>;
}
