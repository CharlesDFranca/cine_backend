import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type UserEmailProps = { value: string };

export class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(private readonly props: UserEmailProps) {
    super(props);
  }

  static create(props: UserEmailProps): UserEmail {
    const email = props.value.trim().toLocaleLowerCase();

    if (!email) {
      throw new Error("O email não pode ser vazio");
    }

    if (email.includes("..")) {
      throw new Error(
        `O email não pode conter conter pontos consecutivos: ${email}`,
      );
    }

    const EMAIL_REGEX =
      /^(?!.*\.\.)(?!\.)([a-zA-Z0-9._%+-]*[a-zA-Z0-9_%+-])@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    if (!EMAIL_REGEX.test(email)) {
      throw new Error(`O email está em um formato inválido: ${email}`);
    }

    return new UserEmail({ value: email });
  }

  get value() {
    return this.props.value;
  }
}
