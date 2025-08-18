import { container } from "tsyringe";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import { IUserEmailUniquenessCheckerService } from "../../domain/services/contracts/IUserEmailUniquenessCheckerService";
import { UserEmailUniquenessCheckerService } from "../../domain/services/UserEmailUniquenessCheckerService";
import { IHashProvider } from "../../app/contracts/IHashProvider";
import { BcryptHashProvider } from "../services/BcryptHashProvider";

container.register<IUserRepository>("UserRepository", {
  useClass: UserRepository,
});
container.register<IUserEmailUniquenessCheckerService>(
  "UserEmailUniquenessCheckerService",
  {
    useClass: UserEmailUniquenessCheckerService,
  },
);

container.register<IHashProvider>("HashProvider", {
  useClass: BcryptHashProvider,
});
