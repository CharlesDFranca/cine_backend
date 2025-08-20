import { TokenPayload } from "@/modules/auth/app/contracts/ITokenProvider";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
