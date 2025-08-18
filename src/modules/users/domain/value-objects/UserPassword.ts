type UserPasswordProps = {
  value: string;
  isHashed: boolean;
};

export class UserPassword {
  private constructor(private readonly props: UserPasswordProps) {}

  static create(
    props: UserPasswordProps,
    isHashed: boolean = false,
  ): UserPassword {
    const password = props.value.trim();

    if (!password) {
      throw new Error("A senha não pode ser vazia");
    }

    if (isHashed) {
      return new UserPassword({ value: password, isHashed: true });
    }

    const MIN_LENGTH = 8;
    const MAX_LENGTH = 128;

    if (password.length < MIN_LENGTH) {
      throw new Error(`A senha não pode ser tão curta: [MIN: ${MIN_LENGTH}]`);
    }

    if (password.length > MAX_LENGTH) {
      throw new Error(`A senha não pode ser tão longa: [MAX: ${MAX_LENGTH}]`);
    }

    const hasLowercase = /[a-z]/;

    if (!hasLowercase.test(password)) {
      throw new Error("A senha deve ter pelo menos uma letra minúscula");
    }

    const hasUppercase = /[A-Z]/;

    if (!hasUppercase.test(password)) {
      throw new Error("A senha deve ter pelo menos uma letra maiúscula");
    }

    const hasNumber = /\d/;

    if (!hasNumber.test(password)) {
      throw new Error("A senha deve ter pelo menos um número");
    }

    const hasSpecialChar = /[^a-zA-Z0-9]/;

    if (!hasSpecialChar.test(password)) {
      throw new Error("A senha deve ter pelo menos um caractere especial");
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
