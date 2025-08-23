import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import {
  IImageStorageService,
  ImageInput,
} from "@/shared/app/contracts/IImageStorageService";
import { inject, injectable } from "tsyringe";
import { envConfig } from "@/config/env/EnvConfig";
import { IImageCompressorService } from "@/shared/app/contracts/IImageCompressorService";

@injectable()
export class CloudinaryStorageService implements IImageStorageService {
  constructor(
    @inject("ImageCompressorService")
    private readonly imageCompressorService: IImageCompressorService,
  ) {
    cloudinary.config({
      cloud_name: envConfig.getCloudinaryCloudName(),
      api_key: envConfig.getCloudinaryApiKey(),
      api_secret: envConfig.getCloudinaryApiSecret(),
    });
  }

  private bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  async save(file: ImageInput): Promise<string> {
    const compressorBuffer = await this.imageCompressorService.compressToBuffer(
      file.buffer,
    );

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "movie_images",
          format: "webp",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!.secure_url);
        },
      );

      this.bufferToStream(compressorBuffer).pipe(uploadStream);
    });
  }

  async delete(fileUrl: string): Promise<void> {
    try {
      const publicId = this.extractPublicIdFromUrl(fileUrl);
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  }

  private extractPublicIdFromUrl(url: string): string {
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+)\.webp$/);

    if (matches && matches[1]) {
      return matches[1];
    }

    throw new Error("A url da imagem é inválida");
  }
}
