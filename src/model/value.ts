import {I18n} from './i18n';
import {Category} from './category';
import {getTranslatedFields, Translated} from './decorators';

export class Value extends I18n {
  id: string;
  @Translated
  value: string;
  category: Category;

  constructor(id?: string, value?: string, category?: Category) {
    super(getTranslatedFields(Value));
    this.id = id;
    this.value = value;
    this.category = category;
  }
}
