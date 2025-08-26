import { UserEntity } from "@/shared/infra/database/entities/UserEntity";
import { User } from "../../domain/entities/User";
import { UserEmail } from "../../domain/value-objects/UserEmail";
import { UserName } from "../../domain/value-objects/UserName";
import { UserPassword } from "../../domain/value-objects/UserPassword";
import { Id } from "@/shared/domain/value-objects/Id";

export class TypeormUserMappper {
  private constructor() {}

  static toDomain(userPersistedData: UserEntity): User {
    const userId = Id.refresh({ value: userPersistedData.id });
    const email = UserEmail.create({ value: userPersistedData.email });
    const name = UserName.create({ value: userPersistedData.name });
    const password = UserPassword.create({
      value: userPersistedData.password,
      isHashed: true,
    });

    return User.restore(userId, {
      email,
      name,
      password,
      isEmailConfirmed: userPersistedData.isEmailConfirmed,
      createdAt: userPersistedData.createdAt,
      updatedAt: userPersistedData.updatedAt,
    });
  }

  static toPersistence(user: User): UserEntity {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      password: user.password.value,
      isEmailConfirmed: user.isEmailConfirmed,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
