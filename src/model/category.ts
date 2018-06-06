import {Attribute} from './attribute';
import {I18n} from './i18n';
import {getTranslatedFields, Translated} from './decorators';

export class Category extends I18n {
  id: string;
  @Translated
  name: string;
  parent: Category;
  attributes: Attribute[];
  children: Category[];

  constructor (id?: string, name?: string, parent?: Category, attributes?: Attribute[], children?: Category[]) {
    super(getTranslatedFields(Category));
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.attributes = attributes;
    this.children = children;
  }
}
