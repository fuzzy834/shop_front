import {I18n} from './i18n';

export class Value extends I18n {
  id: string;
  value: string;

  constructor(id?: string, value?: string) {
    super();
    this.id = id;
    this.value = value;
  }
}
