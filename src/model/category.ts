import {Attribute} from './attribute';
import {I18n} from './i18n';

export class Category extends I18n {
  id: string;
  name: string;
  parent: Category;
  attributes: Attribute[];
  children: Category[];

  constructor (id?: string, name?: string, parent?: Category, attributes?: Attribute[], children?: Category[]) {
    super();
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.attributes = attributes;
    this.children = children;
  }
}
