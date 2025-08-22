export type ImageInput = {
  buffer: Buffer;
  originalname: string;
};

export interface IImageStorageService {
  save(file: ImageInput): Promise<string>;
  delete(relativePath: string): Promise<void>;
}
