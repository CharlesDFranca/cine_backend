import { Id } from "@/shared/domain/value-objects/Id";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserEmail } from "../../domain/value-objects/UserEmail";
import { AppDataSource } from "@/shared/infra/database/TypeormClient";
import { UserEntity } from "@/shared/infra/database/entities/UserEntity";
import { TypeormUserMappper } from "../mappers/TypeormUserMapper";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRepository {
  private readonly repository = AppDataSource.getRepository(UserEntity);

  async save(user: User): Promise<void> {
    await this.repository.save(TypeormUserMappper.toPersistence(user));
  }

  async findById(userId: Id): Promise<User | null> {
    const user = await this.repository.findOneBy({ id: userId.value });

    if (!user) return null;

    return TypeormUserMappper.toDomain(user);
  }

  async findByEmail(userEmail: UserEmail): Promise<User | null> {
    const user = await this.repository.findOneBy({ email: userEmail.value });

    if (!user) return null;

    return TypeormUserMappper.toDomain(user);
  }

  async existsByEmail(userEmail: UserEmail): Promise<boolean> {
    const exists = await this.repository.findOneBy({ email: userEmail.value });

    return !!exists;
  }

  async update(user: User): Promise<void> {
    await this.repository.save(TypeormUserMappper.toPersistence(user));
  }

  async delete(userId: Id): Promise<void> {
    await this.repository.delete(userId.value);
  }
}
