import { IFile } from './file.interface';

export interface IImageFile extends IFile {
  $key: string;
  file: File;
  name: string;
  url: string;
  createdAt: Date;
}

