import { IdGenerator } from "../../utils/IdGenerator.js";
import type { IIdGenerator } from "../contracts/IIdGenerator.js";
import { InvalidValueObject } from "../errors/InvalidValueObject.js";
import { ValueObject } from "./ValueObject.js";

type IdProps = {
  value: string;
};

export class Id extends ValueObject<IdProps> {
  private constructor(private readonly props: IdProps) {
    super(props);
  }

  static generate(idGenerator: IIdGenerator = new IdGenerator()) {
    return this.refresh({ value: idGenerator.use() });
  }

  static refresh(props: IdProps) {
    const id = props.value.trim();

    if (!id) {
      throw new InvalidValueObject("O ID não pode ser vazio", {
        errorClass: this.constructor.name,
      });
    }

    const ID_REGEX =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    if (!ID_REGEX.test(id)) {
      throw new InvalidValueObject(
        "Formato inválido. O ID precisa ser um UUID",
        {
          invalidId: id,
          errorClass: this.constructor.name,
        },
      );
    }

    return new Id(props);
  }

  get value(): string {
    return this.props.value;
  }
}
