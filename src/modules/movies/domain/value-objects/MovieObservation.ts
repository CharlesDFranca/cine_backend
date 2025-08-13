type MovieObservationProps = {
  value: string;
};

export class MovieObservation {
  private constructor(private readonly props: MovieObservationProps) {}

  static create(props: MovieObservationProps) {
    const observation = props.value.trim();
    const MAX_OBSERVATION = 500;
    if (!observation) {
      throw new Error("A observação não pode ser vazia");
    }
    if (observation.length > MAX_OBSERVATION) {
      throw new Error("Tamanho máximo permitido da obsevação ultrapassado");
    }
    return new MovieObservation({ value: observation });
  }
  get value() {
    return this.props.value;
  }
}
