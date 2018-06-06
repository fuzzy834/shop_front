import {Value} from './value';
import {I18n} from './i18n';
import {getTranslatedFields, Translated} from './decorators';

export class Attribute extends I18n {
  id: string;
  @Translated
  name: string;
  priority: number;
  values: Value[];

  constructor (id?: string, name?: string, priority?: number, values?: Value[]) {
    super(getTranslatedFields(Attribute));
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.values = values;
  }
}
