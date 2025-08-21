import { InvalidValueObject } from "@/shared/domain/errors/InvalidValueObject";
import { ValueObject } from "@/shared/domain/value-objects/ValueObject";

type MovieImageProps = {
  value: string;
};

export class MovieImage extends ValueObject<MovieImageProps> {
  private constructor(private readonly props: MovieImageProps) {
    super(props);
  }

  static create(props: MovieImageProps) {
    const image = props.value;
    const allowedExtensions = new Set(["jpeg", "png", "webp", "jpg"]);

    if (!image) {
      throw new InvalidValueObject("A imagem não pode estar vazia", {
        errorClass: this.constructor.name,
      });
    }

    const imageExtension = image.toLowerCase().match(/\.([a-z0-9]+)$/);

    if (!imageExtension) {
      throw new InvalidValueObject("A URL não possui extensão", {
        errorClass: this.constructor.name,
        image,
      });
    }

    if (!allowedExtensions.has(imageExtension[1])) {
      throw new InvalidValueObject("A extensão da URL não é permitida", {
        errorClass: this.constructor.name,
        imageExtension: imageExtension[1],
        allowedExtensions,
      });
    }

    return new MovieImage({ value: image });
  }

  get value() {
    return this.props.value;
  }
}
