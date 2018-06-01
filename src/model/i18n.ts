import {Translation} from './translation';

export class I18n {
  i18n = {};

  addTranslation(field: string, value: string, lang: string) {
    if (!this.i18n.hasOwnProperty(field)) {
      this.i18n[field] = [];
    }
    const index: number = this.i18n[field].findIndex(i18n => i18n.langCode === lang);
    if (index === -1) {
      this.i18n[field].push(new Translation(lang, value));
    } else {
      this.i18n[field][index].value = value;
    }
  }
}
