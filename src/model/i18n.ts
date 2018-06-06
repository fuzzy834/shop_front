export class I18n {
  i18n = {};

  constructor(fields: string[]) {
    fields.forEach(field => this.i18n[field] = []);
  }
}
