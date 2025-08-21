import { InvalidValueObject } from "@/shared/domain/errors/InvalidValueObject";
import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type MovieRatingProps = {
  value: number;
};

export class MovieRating extends ValueObject<MovieRatingProps> {
  private constructor(private readonly props: MovieRatingProps) {
    super(props);
  }

  static create(props: MovieRatingProps) {
    const rating = props.value;
    const MAX_RATING = 10;
    const MIN_RATING = 0;

    if (isNaN(Number(rating))) {
      throw new InvalidValueObject("A avaliação precisa ser númerica", {
        errorClass: this.constructor.name,
      });
    }

    if (rating < MIN_RATING || rating > MAX_RATING) {
      throw new InvalidValueObject("Avaliação Inválida", {
        errorClass: this.constructor.name,
        rating,
        MIN_RATING,
        MAX_RATING,
      });
    }

    return new MovieRating({ value: rating });
  }

  get value() {
    return this.props.value;
  }
}
