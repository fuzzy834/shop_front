import { SafeUrl } from '@angular/platform-browser';

export class UploadImage {
  file: File;
  name: string;
  size: number;
  type: string;
  url: SafeUrl;

  constructor(url: SafeUrl, file: File) {
    this.name = file.name;
    this.url = url;
    this.size = file.size;
    this.type = file.type;
    this.file = file;
  }
}

export class Image {
  name: string;
  size: number;
  type: string;
  url: string;

  constructor(name: string, url: string, size: number, type: string) {
    this.name = name;
    this.url = url;
    this.size = size;
    this.type = type;
  }
}

