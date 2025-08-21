import { InvalidValueObject } from "@/shared/domain/errors/InvalidValueObject";
import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type UserEmailProps = { value: string };

export class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(private readonly props: UserEmailProps) {
    super(props);
  }

  static create(props: UserEmailProps): UserEmail {
    const email = props.value.trim().toLocaleLowerCase();

    if (!email) {
      throw new InvalidValueObject("O email não pode ser vazio", {
        errorClass: this.constructor.name,
      });
    }

    if (email.includes("..")) {
      throw new InvalidValueObject(
        `O email não pode conter conter pontos consecutivos`,
        {
          email,
          errorClass: this.constructor.name,
        },
      );
    }

    const EMAIL_REGEX =
      /^(?!.*\.\.)(?!\.)([a-zA-Z0-9._%+-]*[a-zA-Z0-9_%+-])@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    if (!EMAIL_REGEX.test(email)) {
      throw new InvalidValueObject(`O email está em um formato inválido`, {
        email,
        errorClass: this.constructor.name,
      });
    }

    return new UserEmail({ value: email });
  }

  get value() {
    return this.props.value;
  }
}
