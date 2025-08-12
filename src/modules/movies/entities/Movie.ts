type MovieProps = {
  title: string;
  genre: string;
  classification: number;
  platform: string;
  showtime: number;
  duration: number;
  observation: string;
  watched: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};

export class Movie {
  private constructor(
    private readonly _id: string,
    private readonly props: MovieProps,
  ) {}

  static create(props: MovieProps, id: string) {
    return new Movie(id, props);
  }
}
