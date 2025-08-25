export type MovieDetailsDto = {
  movieId: string;
  userId: string;
  title: string;
  image: string | undefined;
  genre: string;
  classification: string;
  platform: string;
  showtime: Date;
  duration: number;
  observation: string | undefined;
  watched: boolean;
  rating: number | undefined;
  createdAt: Date;
  updatedAt: Date;
};
