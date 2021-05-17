import { Injectable } from '@angular/core';
import { ResizedAndCompressedImage } from '../models';

type CompressionAmount =
  | 0
  | 0.1
  | 0.15
  | 0.2
  | 0.25
  | 0.3
  | 0.35
  | 0.4
  | 0.45
  | 0.5
  | 0.55
  | 0.6
  | 0.65
  | 0.7
  | 0.75
  | 0.8
  | 0.85
  | 0.9
  | 0.95
  | 1;

type ImageType = 'png' | 'jpeg';

@Injectable({
  providedIn: 'root'
})
export class ImageResizeAndCompressService {
  public result: ResizedAndCompressedImage = new ResizedAndCompressedImage();

  // File Reader
  private _fileReader = new FileReader();

  // Input
  private _compressionAmount: CompressionAmount = 0.75;
  private _maxWidth: number;
  private _maxHeight: number;

  // Canvas
  private _imageCanvas = document.createElement('canvas');
  private _imageCanvasContext = this._imageCanvas.getContext('2d');

  public resizeImage(
    imageFile: File,
    compressionAmount: CompressionAmount,
    maxWidth: number,
    maxHeight: number
  ): any {
    console.log(1, '[resizeImage] starting...');
    this._initParameters(imageFile, compressionAmount, maxWidth, maxHeight);

    // Read File
    return new Promise((resolve, reject) => {
      this._fileReader.onload = event => resolve(this._processImage(event));
      this._fileReader.onerror = event => reject(event);

      this._fileReader.readAsDataURL(this.result.imageFile);
    });
  }

  private _initParameters(
    imageFile: File,
    compressionAmount: CompressionAmount,
    maxWidth: number,
    maxHeight: number
  ): void {
    // Make the parameters available globally
    this.result.imageFile = imageFile;
    this.result.imageOriginalSize = Math.round(imageFile.size / 1024);
    this._compressionAmount = compressionAmount;
    this._maxWidth = maxWidth;
    this._maxHeight = maxHeight;
  }

  private _processImage(event: ProgressEvent<FileReader>): any {
    return new Promise((resolve, reject) => {
      this.result.imagePreview = new Image();

      // Read Image
      this.result.imagePreview.onload = event =>
        resolve(this._resizeAndCompress());

      this.result.imagePreview.onerror = event => reject(event);

      this.result.imagePreview.src = event.target.result.toString();
    });
  }

  private _resizeAndCompress(): ResizedAndCompressedImage {
    console.log(2, '[_resizeAndCompress] starting...');
    this._resizeImageCanvas();
    this._compressImage();
    this._setResultImageFile();

    // document.body.append(this.result.imagePreview);
    // document.body.append(this._imageCanvas);

    console.log(2, '[_resizeAndCompress] done...');
    console.log(2, `Original w, h: ${this.result.imageOriginalWidth}px x ${this.result.imageOriginalHeight}px`);
    console.log(2, `New w, h: ${this.result.imagePreview.width}px x ${this.result.imagePreview.height}px`);
    console.log(2, `Compression: ${this.result.imageCompressedSize}Kb/${this.result.imageOriginalSize}Kb`);

    const result = this.result;
    this._destroyParameters();

    return result;
  }

  private _resizeImageCanvas(): void {
    console.log(3, '[_resizeImageCanvas] starting...');

    this.result.imageOriginalWidth = this.result.imagePreview.width;
    this.result.imageOriginalHeight = this.result.imagePreview.height;

    if (this._maxHeight && this._maxWidth) {
      if (
        this.result.imagePreview.width * this._maxHeight >
        this._maxWidth * this.result.imagePreview.height
      ) {
        this._maxHeight =
          (this._maxWidth * this.result.imagePreview.height) /
          this.result.imagePreview.width;
      } else {
        this._maxWidth =
          (this._maxHeight * this.result.imagePreview.width) /
          this.result.imagePreview.height;
      }

      this._imageCanvas.width = this._maxWidth;
      this._imageCanvas.height = this._maxHeight;

      this.result.imagePreview.width = this._maxWidth;
      this.result.imagePreview.height = this._maxHeight;
    } else {
      this._imageCanvas.width = this.result.imagePreview.width;
      this._imageCanvas.height = this.result.imagePreview.height;
    }

    this._imageCanvasContext.drawImage(
      this.result.imagePreview,
      0,
      0,
      this._imageCanvas.width,
      this._imageCanvas.height
    );
  }

  private _compressImage(): void {
    console.log(4, '[_compressImage] starting...');

    const dataUrl = this._imageCanvas.toDataURL(
      `image/${this.result.imageFile.type}`,
      this._compressionAmount
    );
    this.result.imageDataUrl = dataUrl;

    const newFileSize = Math.round(Math.round((dataUrl.length * 3) / 4) / 1024);
    this.result.imageCompressedSize = newFileSize;
  }

  private _setResultImageFile(): void {
    this._dataUrlToBlob(this.result.imageDataUrl);
  }

  private _destroyParameters(): void {
    // Reset global parameters
    this.result = new ResizedAndCompressedImage();
    this._compressionAmount = 0.75;
    this._maxWidth = null;
    this._maxHeight = null;
  }

  private _dataUrlToBlob(dataUrl: string): Blob {
    // Convert base64/URLEncoded data component to raw binary data held in a string
    let byteString: string;

    if (dataUrl.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataUrl.split(',')[1]);
    }
    else {
      byteString = unescape(dataUrl.split(',')[1]);
    }

    // Separate out the mime component
    const mimeString: string = dataUrl.split(',')[0].split(':')[1].split(';')[0];

    // Write the bytes of the string to a typed array
    const uIntArr = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      uIntArr[i] = byteString.charCodeAt(i);
    }

    return new Blob([uIntArr], { type: mimeString });
  }
}
