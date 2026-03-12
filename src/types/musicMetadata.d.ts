declare module "music-metadata" {
  export interface EmbeddedPicture {
    data: Uint8Array;
    format: string;
  }

  export interface AudioMetadata {
    common: {
      picture?: EmbeddedPicture[];
    };
  }

  export function parseBlob(blob: Blob): Promise<AudioMetadata>;
  export function selectCover(pictures?: EmbeddedPicture[]): EmbeddedPicture | null;
}
