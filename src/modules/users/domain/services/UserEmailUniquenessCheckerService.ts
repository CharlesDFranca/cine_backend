import { UserEmail } from "../value-objects/UserEmail";
import { IUserEmailUniquenessCheckerService } from "./contracts/IUserEmailUniquenessCheckerService";

export class UserEmailUniquenessCheckerService
  implements IUserEmailUniquenessCheckerService
{
  async check(
    userEmail: UserEmail,
    userExists: (email: UserEmail) => Promise<boolean>,
  ): Promise<void> {
    const emailAlreadyUsed = await userExists(userEmail);

    if (emailAlreadyUsed) {
      throw new Error("O email já está sendo usado");
    }
  }
}
