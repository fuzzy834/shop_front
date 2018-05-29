import {Value} from './value';

export class Attribute {
  id: string;
  name: string;
  priority: number;
  values: Value[];

  constructor (id: string, name: string, priority: number, values: Value[]) {
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.values = values;
  }
}
