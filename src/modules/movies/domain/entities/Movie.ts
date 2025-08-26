import { Id } from "@/shared/domain/value-objects/Id.js";
import { MovieClassification } from "../value-objects/MovieClassification";
import { MovieDuration } from "../value-objects/MovieDuration";
import { MovieGenre } from "../value-objects/MovieGenre";
import { MovieObservation } from "../value-objects/MovieObservation";
import { MoviePlatform } from "../value-objects/MoviePlatform";
import { MovieRating } from "../value-objects/MovieRating.js";
import { MovieTitle } from "../value-objects/MovieTitle";
import { Entity } from "@/shared/domain/entities/Entity";
import { MovieImage } from "../value-objects/MovieImage";
import { InvalidShowtimeError } from "../errors/InvalidShowtimeError";

type MovieProps = {
  title: MovieTitle;
  image?: MovieImage;
  genre: MovieGenre;
  userId: Id;
  classification: MovieClassification;
  platform: MoviePlatform;
  showtime: Date;
  duration: MovieDuration;
  observation?: MovieObservation;
  watched: boolean;
  rating?: MovieRating;
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
    const now = new Date();

    if (props.showtime.getTime() < now.getTime()) {
      throw new InvalidShowtimeError("A data não pode ser anterior a atual", {
        showtime: props.showtime,
        errorClass: this.constructor.name,
      });
    }

    return new Movie(movieId, props);
  }

  static restore(movieId: Id, props: MovieProps) {
    return new Movie(movieId, props);
  }
  //#region update methods
  updateTitle(title: MovieTitle) {
    this.props.title = title;
    this.touch();
  }

  updateImage(image: MovieImage | undefined) {
    this.props.image = image;
    this.touch();
  }

  updateGenre(genre: MovieGenre) {
    this.props.genre = genre;
    this.touch();
  }

  updateClassification(classification: MovieClassification) {
    this.props.classification = classification;
    this.touch();
  }

  updatePlatform(platform: MoviePlatform) {
    this.props.platform = platform;
    this.touch();
  }

  updateShowtime(showtime: Date) {
    if (showtime.getTime() < new Date().getTime()) {
      throw new InvalidShowtimeError("A data não pode ser anterior a atual", {
        showtime,
        errorClass: this.constructor.name,
      });
    }

    this.props.showtime = showtime;
    this.touch();
  }

  updateDuration(duration: MovieDuration) {
    this.props.duration = duration;
    this.touch();
  }

  updateObservation(observation: MovieObservation | undefined) {
    this.props.observation = observation;
    this.touch();
  }

  updateWatched(watched: boolean) {
    this.props.watched = watched;
    this.touch();
  }

  updateRating(rating: MovieRating | undefined) {
    this.props.rating = rating;
    this.touch();
  }

  //#endregion
  //#region getters
  get title() {
    return this.props.title;
  }

  get genre() {
    return this.props.genre;
  }

  get userId() {
    return this.props.userId;
  }

  get classification() {
    return this.props.classification;
  }

  get platform() {
    return this.props.platform;
  }

  get showtime() {
    return this.props.showtime;
  }

  get duration() {
    return this.props.duration;
  }

  get observation() {
    return this.props.observation;
  }

  get watched() {
    return this.props.watched;
  }

  get rating() {
    return this.props.rating;
  }

  get image() {
    return this.props.image;
  }
  //#endregion

  isWatched() {
    this.props.watched = true;
    this.touch();
  }

  isNotWatched() {
    this.props.watched = false;
    this.touch();
  }
}
