import { InvalidValueObject } from "@/shared/domain/errors/InvalidValueObject";
import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type UserNameProps = {
  value: string;
};

export class UserName extends ValueObject<UserNameProps> {
  private constructor(private readonly props: UserNameProps) {
    super(props);
  }

  static create(props: UserNameProps): UserName {
    const MIN_LENGTH = 2;
    const name = props.value.trim();

    if (!name) {
      throw new InvalidValueObject("O nome não pode ser vazio");
    }

    if (!isNaN(Number(name))) {
      throw new InvalidValueObject("O nome não pode ser um número");
    }

    if (name.length < MIN_LENGTH) {
      throw new InvalidValueObject(
        "O nome não pode ter menos de dois caracteres",
        {
          minLength: MIN_LENGTH,
        },
      );
    }

    return new UserName({ value: name });
  }

  get value(): string {
    return this.props.value;
  }
}
