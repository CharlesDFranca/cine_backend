import { InvalidValueObject } from "@/shared/domain/errors/InvalidValueObject";
import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type MoviePlatformProps = {
  value: string;
};

export class MoviePlatform extends ValueObject<MoviePlatformProps> {
  private constructor(private readonly props: MoviePlatformProps) {
    super(props);
  }

  static create(props: MoviePlatformProps) {
    const platform = props.value.trim();

    if (!platform) {
      throw new InvalidValueObject("A classificação não pode ser vazia", {
        errorClass: this.constructor.name,
      });
    }

    return new MoviePlatform({ value: platform });
  }

  get value() {
    return this.props.value;
  }
}
