declare module "gifenc" {
  export type GifPalette = number[][];

  export type GifFrameOptions = {
    palette?: GifPalette;
    delay?: number;
    repeat?: number;
    transparent?: boolean;
    transparentIndex?: number;
  };

  export type GifEncoderInstance = {
    writeFrame(
      index: Uint8Array,
      width: number,
      height: number,
      options?: GifFrameOptions,
    ): void;
    finish(): void;
    bytes(): Uint8Array;
  };

  export function GIFEncoder(): GifEncoderInstance;
}
