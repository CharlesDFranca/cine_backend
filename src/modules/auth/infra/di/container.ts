import { container } from "tsyringe";
import { ITokenProvider } from "../../app/contracts/ITokenProvider";
import { JWTTokenProvider } from "../services/JWTTokenProvider";
import { IHashProvider } from "../../app/contracts/IHashProvider";
import { BcryptHashProvider } from "../services/BcryptHashProvider";

container.register<ITokenProvider>("TokenProvider", {
  useClass: JWTTokenProvider,
});

container.register<IHashProvider>("HashProvider", {
  useClass: BcryptHashProvider,
});
