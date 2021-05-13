import { IImageFile } from './image-file.interface';

export interface IImageFileUpload extends IImageFile {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date;
}

