import type { UserEmail } from "../value-objects/UserEmail.js";
import type { UserName } from "../value-objects/UserName.js";
import type { UserPassword } from "../value-objects/UserPassword.js";

type UserProps = {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  private constructor(
    private readonly _id: string,
    private readonly props: UserProps,
  ) {}

  static create(props: UserProps, _id: string) {
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
