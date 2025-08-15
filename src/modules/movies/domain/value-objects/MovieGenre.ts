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

export class MovieGenre {
  private constructor(private readonly props: MovieGenreProps) {}

  static create(props: MovieGenreProps) {
    const genre = props.value.trim();

    if (!genre) {
      throw new Error("O genêro não pode ser vazio");
    }
    if (!movieGenreTypes.includes(genre)) {
      throw new Error("Genêro inválido");
    }
    return new MovieGenre({ value: genre });
  }

  get value() {
    return this.props.value;
  }
}
