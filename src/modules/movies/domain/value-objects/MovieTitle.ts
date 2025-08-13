type MovieTitleProps = {
  value: string;
};

export class MovieTitle {
  private constructor(private readonly props: MovieTitleProps) {}

  static create(props: MovieTitleProps) {
    const title = props.value.trim();
    if (!title) {
      throw new Error("O título não pode ser vazio");
    }
    return new MovieTitle({ value: title });
  }

  get value() {
    return this.props.value;
  }
}
