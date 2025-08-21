import { InvalidValueObject } from "@/shared/domain/errors/InvalidValueObject";
import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type MovieGenreProps = {
  value: string;
};

const movieGenreTypes = [
  "Ação",
  "Aventura",
  "Comédia",
  "Drama",
  "Romance",
  "Terror/Horror",
  "Suspese/Thriller",
  "Ficção Científica",
  "Fantasia",
  "Musical",
  "Animação",
  "Documentário",
];

export class MovieGenre extends ValueObject<MovieGenreProps> {
  private constructor(private readonly props: MovieGenreProps) {
    super(props);
  }

  static create(props: MovieGenreProps) {
    const genre = props.value.trim();

    if (!genre) {
      throw new InvalidValueObject("O genêro não pode ser vazio", {
        errorClass: this.constructor.name,
      });
    }

    if (!movieGenreTypes.includes(genre)) {
      throw new InvalidValueObject("Genêro inválido", {
        errorClass: this.constructor.name,
        genre,
      });
    }

    return new MovieGenre({ value: genre });
  }

  get value() {
    return this.props.value;
  }
}
