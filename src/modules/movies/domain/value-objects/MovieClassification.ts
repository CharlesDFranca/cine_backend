type MovieClassificationProps = {
  value: string;
};

const movieClassificationTypes = ["L", "10", "12", "14", "16", "18"];

export class MovieClassification {
  private constructor(private readonly props: MovieClassificationProps) {}

  static create(props: MovieClassificationProps) {
    const classification = props.value;

    if (!classification) {
      throw new Error("A classificação não pode ser vazia");
    }
    if (!movieClassificationTypes.includes(classification)) {
      throw new Error("Classificação Inválida");
    }
    return new MovieClassification({ value: classification });
  }
  get value() {
    return this.props.value;
  }
}
