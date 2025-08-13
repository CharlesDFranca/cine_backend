import type { MovieClassification } from "../value-objects/MovieClassification.js";
import type { MovieDuration } from "../value-objects/MovieDuration.js";
import type { MovieGenre } from "../value-objects/MovieGenre.js";
import type { MovieObservation } from "../value-objects/MovieObservation.js";
import type { MoviePlatform } from "../value-objects/MoviePlatform.js";
import type { MovieTitle } from "../value-objects/MovieTitle.js";

type MovieProps = {
  title: MovieTitle;
  genre: MovieGenre;
  userId: string;
  classification: MovieClassification;
  platform: MoviePlatform;
  showtime: Date;
  duration: MovieDuration;
  observation?: MovieObservation;
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
