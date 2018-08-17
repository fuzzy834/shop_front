import { ProductAttribute } from './product.attribute';
import {Category} from './category';
import {I18n} from './i18n';
import {getTranslatedFields, Translated} from './decorators';
import {Image} from './image';

export class Product extends I18n {
  id: string;
  @Translated
  name: string;
  @Translated
  description: string;
  retailPrice: number;
  bulkPrice: number;
  discount: number;
  currency: string;
  category: Category;
  attributes: ProductAttribute[];
  images: Image[];

  constructor(id?: string, name?: string, description?: string, retailPrice?: number,
              bulkPrice?: number, discount?: number, currency?: string,
              category?: Category, attributes: ProductAttribute[] = [], images?: Image[]) {
    super(getTranslatedFields(Product));
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
