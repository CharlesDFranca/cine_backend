import bcrypt from "bcrypt";

import { injectable } from "tsyringe";
import { IHashProvider } from "../../app/contracts/IHashProvider";

@injectable()
export class BcryptHashProvider implements IHashProvider {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
