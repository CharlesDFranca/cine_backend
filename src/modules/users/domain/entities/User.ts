import { Entity } from "@/shared/domain/entities/Entity.js";
import { UserEmail } from "../value-objects/UserEmail.js";
import { UserName } from "../value-objects/UserName.js";
import { UserPassword } from "../value-objects/UserPassword.js";
import { Id } from "@/shared/domain/value-objects/Id.js";

type UserProps = {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  createdAt: Date;
  updatedAt: Date;
};

export class User extends Entity {
  private constructor(
    private readonly userId: Id,
    private readonly props: UserProps,
  ) {
    super(userId, props.createdAt, props.updatedAt);
  }

  static create(props: UserProps): User {
    const userId = Id.generate();

    if (props.createdAt.getTime() > props.updatedAt.getTime()) {
      throw new Error(
        "A data de criação não pode estar a frente da data de atualização",
      );
    }

    return new User(userId, props);
  }

  static restore(id: Id, props: UserProps): User {
    return new User(id, props);
  }

  get name(): UserName {
    return this.props.name;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }
}
