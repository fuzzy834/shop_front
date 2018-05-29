export class ProductAttribute {
  id: string;
  priority: number;
  name: string;
  value: string;

  constructor(id: string, priority: number, name: string, value: string) {
    this.id = id;
    this.priority = priority;
    this.name = name;
    this.value = value;
  }
}
