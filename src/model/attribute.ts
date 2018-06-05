import {Value} from './value';
import {I18n} from './i18n';

export class Attribute extends I18n {
  id: string;
  name: string;
  priority: number;
  values: Value[];

  constructor (id?: string, name?: string, priority?: number, values?: Value[]) {
    super();
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.values = values;
  }
}
