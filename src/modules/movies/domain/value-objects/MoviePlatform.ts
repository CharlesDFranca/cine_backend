type MoviePlatformProps = {
  value: string;
};

export class MoviePlatform {
  private constructor(private readonly props: MoviePlatformProps) {}

  static create(props: MoviePlatformProps) {
    const platform = props.value.trim();

    if (!platform) {
      throw new Error("A classificação não pode ser vazia");
    }
    return new MoviePlatform({ value: platform });
  }
  get value() {
    return this.props.value;
  }
}
