import {Attribute} from './attribute';

export class Category {
  id: string;
  name: string;
  parent: string;
  attributes: Attribute[];
  children: Category[];

  constructor (id: string, name: string, parent: string, attributes: Attribute[], children: Category[]) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.attributes = attributes;
    this.children = children;
  }
}
