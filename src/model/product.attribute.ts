interface SimpleValue {
  id: string;
  name: string;
}

export class ProductAttribute {
  id: string;
  priority: number;
  name: string;
  values: SimpleValue[];


  constructor(id?: string, priority?: number, name?: string, values?: SimpleValue[]) {
    this.id = id;
    this.priority = priority;
    this.name = name;
    this.values = values;
  }
}
