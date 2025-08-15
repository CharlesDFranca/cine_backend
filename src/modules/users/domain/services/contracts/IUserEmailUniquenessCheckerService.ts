import { User } from "../../entities/User";
import { UserEmail } from "../../value-objects/UserEmail";

export interface IUserEmailUniquenessCheckerService {
  check(
    user: User,
    userExists: (email: UserEmail) => Promise<boolean>,
  ): Promise<void>;
}
