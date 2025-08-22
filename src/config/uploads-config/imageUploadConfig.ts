import multer, { StorageEngine } from "multer";
import { envConfig } from "../env/EnvConfig";

export const validStorageDrivers = ["disk"] as const;
export type StorageDrivers = (typeof validStorageDrivers)[number];

interface IUploadConfig {
  driver: StorageDrivers;
  directory: string;
  multer: {
    storage: StorageEngine;
    limits: {
      fileSize: number;
    };
    fileFilter?: multer.Options["fileFilter"];
  };
}

const imageUploadConfig: IUploadConfig = {
  driver: envConfig.getStorageDriver(),
  multer: {
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter(req, file, callback) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpeg",
      ];
      if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(
          new Error(
            "Tipo de arquivo inválido. Apenas JPG, PNG, JPEG, e WEBP são permitidos.",
          ),
        );
      }
    },
  },
} as IUploadConfig;

export { imageUploadConfig };
