export interface IResizedAndCompressedImage {
  imageFile: File;
  imagePreview: HTMLImageElement;
  imageDataUrl: string;

  imageOriginalWidth: number;
  imageOriginalHeight: number;

  imageOriginalSize: number;
  imageCompressedSize: number;
}
