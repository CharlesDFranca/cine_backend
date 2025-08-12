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
    private readonly id: string,
    private readonly props: MovieProps,
  ) {}
}
