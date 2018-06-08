import {I18n} from './i18n';
import {Category} from './category';
import {getTranslatedFields, Translated} from './decorators';

export class Value extends I18n {
  id: string;
  @Translated
  value: string;
  categoryId: string;

  constructor(id?: string, value?: string, categoryId?: string) {
    super(getTranslatedFields(Value));
    this.id = id;
    this.value = value;
    this.categoryId = categoryId;
  }
}
