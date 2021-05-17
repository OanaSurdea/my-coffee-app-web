import { IResizedAndCompressedImage } from '../interfaces';

export class ResizedAndCompressedImage implements IResizedAndCompressedImage {
  imageFile: File;
  imagePreview: HTMLImageElement;
  imageDataUrl: string;

  imageOriginalWidth: number;
  imageOriginalHeight: number;

  imageOriginalSize: number;
  imageCompressedSize: number;

  constructor(
    imageFile = null,
    imagePreview = null,
    imageDataUrl = null,
    imageOriginalWidth = null,
    imageOriginalHeight = null,
    imageOriginalSize = null,
    imageCompressedSize = null
  ) {
    this.imageFile = imageFile;
    this.imagePreview = imagePreview;
    this.imageDataUrl = imageDataUrl;

    this.imageOriginalWidth = imageOriginalWidth;
    this.imageOriginalHeight = imageOriginalHeight;

    this.imageOriginalSize = imageOriginalSize;
    this.imageCompressedSize = imageCompressedSize;
  }
}
