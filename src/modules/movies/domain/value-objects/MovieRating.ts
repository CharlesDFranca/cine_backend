type MovieRatingProps = {
  value: number;
};

export class MovieRating {
  private constructor(private readonly props: MovieRatingProps) {}

  static create(props: MovieRatingProps) {
    const rating = props.value;
    const MAX_RATING = 10;
    const MIN_RATING = 0;

    if (isNaN(Number(rating))) {
      throw new Error("A avaliação precisa ser númerica");
    }
    if (rating < MIN_RATING || rating > MAX_RATING) {
      throw new Error("Avaliação Inválida");
    }
    return new MovieRating({ value: rating });
  }
  get value() {
    return this.props.value;
  }
}
