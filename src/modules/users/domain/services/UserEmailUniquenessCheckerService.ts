import { User } from "../entities/User";
import { UserEmail } from "../value-objects/UserEmail";
import { IUserEmailUniquenessCheckerService } from "./contracts/IUserEmailUniquenessCheckerService";

export class UserEmailUniquenessCheckerService
  implements IUserEmailUniquenessCheckerService
{
  async check(
    user: User,
    userExists: (email: UserEmail) => Promise<boolean>,
  ): Promise<void> {
    const emailAlreadyUsed = await userExists(user.email);

    if (emailAlreadyUsed) {
      throw new Error("O email já está sendo usado");
    }
  }
}
