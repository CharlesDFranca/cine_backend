type UserNameProps = {
  value: string;
};

export class UserName {
  private constructor(private readonly props: UserNameProps) {}

  static create(props: UserNameProps): UserName {
    const MIN_LENGTH = 2;
    const name = props.value.trim();

    if (!name) {
      throw new Error("O nome não pode ser vazio");
    }

    if (!isNaN(Number(name))) {
      throw new Error("O nome não pode ser um número");
    }

    if (name.length < MIN_LENGTH) {
      throw new Error("O nome não pode ter menos de dois caracteres");
    }

    return new UserName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
