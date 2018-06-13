export class ProductAttribute {
  id: string;
  priority: number;
  name: string;
  value: string;
  valueId: string;

  constructor(id?: string, priority?: number, name?: string, value?: string, valueId?: string) {
    this.id = id;
    this.priority = priority;
    this.name = name;
    this.value = value;
    this.valueId = valueId;
  }
}
