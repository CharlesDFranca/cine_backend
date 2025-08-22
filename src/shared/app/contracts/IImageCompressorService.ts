export type ImageCompressorProps = {
  buffer: Buffer;
  outputPath: string;
};

export interface IImageCompressorService {
  process(fileProps: ImageCompressorProps): Promise<void>;
  processMultiple(filesProps: ImageCompressorProps[]): Promise<void>;
}
