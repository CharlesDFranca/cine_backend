import fs from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { inject, injectable } from "tsyringe";
import {
  IImageStorageService,
  ImageInput,
} from "@/shared/app/contracts/IImageStorageService";
import { IImageCompressorService } from "@/shared/app/contracts/IImageCompressorService";

@injectable()
export class DiskStorageService implements IImageStorageService {
  constructor(
    @inject("ImageCompressorService")
    private readonly imageCompressorService: IImageCompressorService,
  ) {}

  private readonly uploadFolder = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "uploads",
  );

  async save(file: ImageInput): Promise<string> {
    const hash = randomBytes(10).toString("hex");
    const filename = `${hash}-${file.originalname.replace(/\s+/g, "-")}.webp`;
    const outputPath = path.join(this.uploadFolder, filename);

    try {
      await fs.access(this.uploadFolder);
    } catch {
      await fs.mkdir(this.uploadFolder, { recursive: true });
    }

    await this.imageCompressorService.process({
      buffer: file.buffer,
      outputPath,
    });

    return `/uploads/${filename}`;
  }

  async delete(relativePath: string): Promise<void> {
    const fullPath = path.resolve(
      this.uploadFolder,
      relativePath.replace("/uploads/", ""),
    );
    await fs.unlink(fullPath).catch(() => null);
  }
}
