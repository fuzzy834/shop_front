import { SafeUrl } from '@angular/platform-browser';

export class UploadImage {
  file: File;
  name: string;
  size: string;
  type: string;
  url: SafeUrl;

  constructor(url: SafeUrl, file: File) {
    this.name = file.name;
    this.url = url;
    this.size = Image.bytesToSize(file.size);
    this.type = file.type;
    this.file = file;
  }
}

export class Image {
  name: string;
  size: string;
  type: string;
  url: string;

  constructor(name: string, url: string, size: number, type: string) {
    this.name = name;
    this.url = url;
    this.size = Image.bytesToSize(size);
    this.type = type;
  }

  static bytesToSize(bytes: number): string {
    const sizes: string[] = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return '0 B';
    }
    const i: number = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }
}

