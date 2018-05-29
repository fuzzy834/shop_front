import { ProductAttribute } from './product.attribute';
import {Category} from './category';

export class Product {
  id: string;
  name: string;
  description: string;
  retailPrice: number;
  bulkPrice: number;
  discount: number;
  currency: string;
  category: Category;
  attributes: ProductAttribute[];
  images: string[];

  constructor(id?: string, name?: string, description?: string, retailPrice?: number,
              bulkPrice?: number, discount?: number, currency?: string,
              category?: Category, attributes?: ProductAttribute[], images?: string[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.retailPrice = retailPrice;
    this.bulkPrice = bulkPrice;
    this.discount = discount;
    this.currency = currency;
    this.category = category;
    this.attributes = attributes;
    this.images = images;
  }
}
