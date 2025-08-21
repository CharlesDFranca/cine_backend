import { InvalidValueObject } from "@/shared/domain/errors/InvalidValueObject";
import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type MovieTitleProps = {
  value: string;
};

export class MovieTitle extends ValueObject<MovieTitleProps> {
  private constructor(private readonly props: MovieTitleProps) {
    super(props);
  }

  static create(props: MovieTitleProps) {
    const title = props.value.trim();

    if (!title) {
      throw new InvalidValueObject("O título não pode ser vazio", {
        errorClass: this.constructor.name,
      });
    }

    return new MovieTitle({ value: title });
  }

  get value() {
    return this.props.value;
  }
}
