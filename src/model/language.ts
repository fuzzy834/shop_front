export class Language {
  id: string;
  code: string;
  name: string;

  constructor(id?: string, code?: string, name?: string) {
    this.code = code;
    this.name = name;
  }
}
