type UserProps = {
  name: string;
  email: string;
  password: string;
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
}
