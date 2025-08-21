import { InvalidValueObject } from "@/shared/domain/errors/InvalidValueObject";
import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type MovieObservationProps = {
  value: string;
};

export class MovieObservation extends ValueObject<MovieObservationProps> {
  private constructor(private readonly props: MovieObservationProps) {
    super(props);
  }

  static create(props: MovieObservationProps) {
    const observation = props.value.trim();
    const MAX_OBSERVATION = 500;

    if (!observation) {
      throw new InvalidValueObject("A observação não pode ser vazia", {
        errorClass: this.constructor.name,
      });
    }

    if (observation.length > MAX_OBSERVATION) {
      throw new InvalidValueObject(
        "Tamanho máximo permitido da obsevação ultrapassado",
        {
          errorClass: this.constructor.name,
          observation: observation.length,
          MAX_OBSERVATION,
        },
      );
    }

    return new MovieObservation({ value: observation });
  }

  get value() {
    return this.props.value;
  }
}
