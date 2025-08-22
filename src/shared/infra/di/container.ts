import "@/modules/movies/infra/di/container";
import "@/modules/users/infra/di/container";
import "@/modules/auth/infra/di/container";

import { container } from "tsyringe";
import { IImageStorageService } from "@/shared/app/contracts/IImageStorageService";
import { DiskStorageService } from "../services/DiskImageStorageService";
import { IImageCompressorService } from "@/shared/app/contracts/IImageCompressorService";
import { SharpImageCompressorService } from "../services/SharpImageCompressor";

container.register<IImageStorageService>("ImageStorageService", {
  useClass: DiskStorageService,
});

container.register<IImageCompressorService>("ImageCompressorService", {
  useClass: SharpImageCompressorService,
});
