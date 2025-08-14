import { Entity } from "@/shared/domain/entities/Entity.js";
import type { UserEmail } from "../value-objects/UserEmail.js";
import type { UserName } from "../value-objects/UserName.js";
import type { UserPassword } from "../value-objects/UserPassword.js";
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
    super(userId);
  }

  static create(props: UserProps, _id: Id) {
    return new User(_id, props);
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
