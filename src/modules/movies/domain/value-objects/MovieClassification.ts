import { InvalidValueObject } from "@/shared/domain/errors/InvalidValueObject";
import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type MovieClassificationProps = {
  value: string;
};

const movieClassificationTypes = ["L", "10", "12", "14", "16", "18"];

export class MovieClassification extends ValueObject<MovieClassificationProps> {
  private constructor(private readonly props: MovieClassificationProps) {
    super(props);
  }

  static create(props: MovieClassificationProps) {
    const classification = props.value;

    if (!classification) {
      throw new InvalidValueObject("A classificação não pode ser vazia", {
        errorClass: this.constructor.name,
      });
    }

    if (!movieClassificationTypes.includes(classification)) {
      throw new InvalidValueObject("Classificação Inválida", {
        errorClass: this.constructor.name,
        classification,
      });
    }

    return new MovieClassification({ value: classification });
  }

  get value() {
    return this.props.value;
  }
}
