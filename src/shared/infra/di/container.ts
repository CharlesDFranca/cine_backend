import "@/modules/movies/infra/di/container";
import "@/modules/users/infra/di/container";
import "@/modules/auth/infra/di/container";

import { container } from "tsyringe";
import { IImageStorageService } from "@/shared/app/contracts/IImageStorageService";
//import { DiskStorageService } from "../services/DiskImageStorageService";
import { IImageCompressorService } from "@/shared/app/contracts/IImageCompressorService";
import { SharpImageCompressorService } from "../services/SharpImageCompressor";
import { CloudinaryStorageService } from "../services/CloudinaryImageStorageService";
import { ICodeVerificationService } from "@/modules/auth/domain/services/contratcs/ICodeVerificationService";
import { RedisEmailCodeVerificationService } from "../services/RedisEmailCodeVerificationService";

container.register<IImageStorageService>("ImageStorageService", {
  useClass: CloudinaryStorageService,
});

container.register<IImageCompressorService>("ImageCompressorService", {
  useClass: SharpImageCompressorService,
});

container.register<ICodeVerificationService>("CodeVerificationService", {
  useClass: RedisEmailCodeVerificationService,
});
