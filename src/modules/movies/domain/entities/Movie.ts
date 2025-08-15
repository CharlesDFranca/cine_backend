import { Id } from "@/shared/domain/value-objects/Id.js";
import { MovieClassification } from "../value-objects/MovieClassification";
import { MovieDuration } from "../value-objects/MovieDuration";
import { MovieGenre } from "../value-objects/MovieGenre";
import { MovieObservation } from "../value-objects/MovieObservation";
import { MoviePlatform } from "../value-objects/MoviePlatform";
import { MovieRating } from "../value-objects/MovieRating.js";
import { MovieTitle } from "../value-objects/MovieTitle";
import { Entity } from "@/shared/domain/entities/Entity";

type MovieProps = {
  title: MovieTitle;
  genre: MovieGenre;
  userId: Id;
  classification: MovieClassification;
  platform: MoviePlatform;
  showtime: Date;
  duration: MovieDuration;
  observation?: MovieObservation;
  watched: boolean;
  rating: MovieRating;
  createdAt: Date;
  updatedAt: Date;
};

export class Movie extends Entity {
  private constructor(
    private readonly movieId: Id,
    private readonly props: MovieProps,
  ) {
    super(movieId, props.createdAt, props.updatedAt);
  }

  static create(props: MovieProps) {
    const movieId = Id.generate();

    if (props.createdAt.getTime() > props.updatedAt.getTime()) {
      throw new Error(
        "A data de criação não pode estar a frente da data de atualização",
      );
    }
    return new Movie(movieId, props);
  }

  static restore(movieId: Id, props: MovieProps) {
    return new Movie(movieId, props);
  }
}
