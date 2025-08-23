import {
  IImageCompressorService,
  ImageCompressorProps,
} from "@/shared/app/contracts/IImageCompressorService";
import sharp from "sharp";
import { injectable } from "tsyringe";

@injectable()
export class SharpImageCompressorService implements IImageCompressorService {
  async process(fileProps: ImageCompressorProps): Promise<void> {
    await sharp(fileProps.buffer)
      .resize({ width: 600 })
      .webp({ quality: 60 })
      .toFile(fileProps.outputPath);
  }

  async processMultiple(filesProps: ImageCompressorProps[]): Promise<void> {
    await Promise.all(filesProps.map((fileProps) => this.process(fileProps)));
  }

  async compressToBuffer(buffer: Buffer): Promise<Buffer> {
    return await sharp(buffer)
      .resize({ width: 600 })
      .webp({ quality: 60 })
      .toBuffer();
  }
}
