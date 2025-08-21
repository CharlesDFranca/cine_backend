import { InvalidValueObject } from "@/shared/domain/errors/InvalidValueObject";
import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type UserPasswordProps = {
  value: string;
  isHashed: boolean;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(private readonly props: UserPasswordProps) {
    super(props);
  }

  static create(
    props: UserPasswordProps,
    isHashed: boolean = false,
  ): UserPassword {
    const password = props.value.trim();

    if (!password) {
      throw new InvalidValueObject("A senha não pode ser vazia", {
        errorClass: this.constructor.name,
      });
    }

    if (isHashed) {
      return new UserPassword({ value: password, isHashed: true });
    }

    const MIN_LENGTH = 8;
    const MAX_LENGTH = 128;

    if (password.length < MIN_LENGTH) {
      throw new InvalidValueObject(`A senha não pode ser tão curta`, {
        minLength: MIN_LENGTH,
        currentLength: password.length,
        errorClass: this.constructor.name,
      });
    }

    if (password.length > MAX_LENGTH) {
      throw new InvalidValueObject(`A senha não pode ser tão longa`, {
        maxLenght: MAX_LENGTH,
        currentLength: password.length,
        errorClass: this.constructor.name,
      });
    }

    const hasLowercase = /[a-z]/;

    if (!hasLowercase.test(password)) {
      throw new InvalidValueObject(
        "A senha deve ter pelo menos uma letra minúscula",
        {
          password,
          errorClass: this.constructor.name,
        },
      );
    }

    const hasUppercase = /[A-Z]/;

    if (!hasUppercase.test(password)) {
      throw new InvalidValueObject(
        "A senha deve ter pelo menos uma letra maiúscula",
        {
          password,
          errorClass: this.constructor.name,
        },
      );
    }

    const hasNumber = /\d/;

    if (!hasNumber.test(password)) {
      throw new InvalidValueObject("A senha deve ter pelo menos um número", {
        errorClass: this.constructor.name,
      });
    }

    const hasSpecialChar = /[^a-zA-Z0-9]/;

    if (!hasSpecialChar.test(password)) {
      throw new InvalidValueObject(
        "A senha deve ter pelo menos um caractere especial",
        {
          password,
          errorClass: this.constructor.name,
        },
      );
    }

    return new UserPassword({ value: password, isHashed: false });
  }

  static restore(props: UserPasswordProps) {
    return UserPassword.create({ value: props.value, isHashed: true }, true);
  }

  get value(): string {
    return this.props.value;
  }

  get isHashed(): boolean {
    return this.props.isHashed;
  }
}
