import { container } from "tsyringe";
import { ITokenProvider } from "../../app/contracts/ITokenProvider";
import { JWTTokenProvider } from "../services/JWTTokenProvider";
import { IHashProvider } from "../../app/contracts/IHashProvider";
import { BcryptHashProvider } from "../services/BcryptHashProvider";
import { IEmailVerificationCodeService } from "../../domain/services/contratcs/IEmailVerificationCodeService";
import { EmailVerificationCodeService } from "../../domain/services/EmailVerificationCodeService";

container.register<ITokenProvider>("TokenProvider", {
  useClass: JWTTokenProvider,
});

container.register<IHashProvider>("HashProvider", {
  useClass: BcryptHashProvider,
});

container.register<IEmailVerificationCodeService>(
  "EmailVerificationCodeService",
  {
    useClass: EmailVerificationCodeService,
  },
);
