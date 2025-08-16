import { UserEmail } from "../../value-objects/UserEmail";

export interface IUserEmailUniquenessCheckerService {
  check(
    userEmail: UserEmail,
    userExists: (email: UserEmail) => Promise<boolean>,
  ): Promise<void>;
}
