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
      throw new Error("A imagem não pode estar vazia");
    }

    const imageExtension = image.toLowerCase().match(/\.([a-z0-9]+)$/);

    if (!imageExtension) {
      throw new Error("A URL não possui extensão");
    }

    if (!allowedExtensions.has(imageExtension[1])) {
      throw new Error("A extensão da URL não é permitida");
    }

    return new MovieImage({ value: image });
  }

  get value() {
    return this.props.value;
  }
}
