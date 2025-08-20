import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type MovieDurationProps = {
  value: number;
};

export class MovieDuration extends ValueObject<MovieDurationProps> {
  private constructor(private readonly props: MovieDurationProps) {
    super(props);
  }

  static create(props: MovieDurationProps) {
    const duration = props.value;
    const MIN_DURATION = 0;

    if (isNaN(Number(duration))) {
      throw new Error("A duração precisa ser um número");
    }

    if (duration < MIN_DURATION) {
      throw new Error("Duração mínima não atingida");
    }

    return new MovieDuration({ value: duration });
  }

  get value() {
    return this.props.value;
  }
}
