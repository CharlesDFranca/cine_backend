import { IdGenerator } from "../../utils/IdGenerator.js";
import type { IIdGenerator } from "../contracts/IIdGenerator.js";

type IdProps = {
  value: string;
};

export class Id {
  private constructor(private readonly props: IdProps) {}

  static generate(idGenerator: IIdGenerator = new IdGenerator()) {
    return this.refresh({ value: idGenerator.use() });
  }

  static refresh(props: IdProps) {
    const id = props.value.trim();

    if (!id) {
      throw new Error("O ID não pode ser vazio");
    }

    const ID_REGEX =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    if (!ID_REGEX.test(id)) {
      throw new Error("Formato inválido. O ID precisa ser um UUID");
    }

    return new Id(props);
  }

  get value(): string {
    return this.props.value;
  }
}
