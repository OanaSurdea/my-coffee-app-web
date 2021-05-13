import { IImageFileUpload } from '../interfaces/image-file-upload.interface';

export class ImageFileUpload implements IImageFileUpload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date;

  constructor(file: File) {
    this.file = file;
  }
}

