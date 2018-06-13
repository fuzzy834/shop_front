import {Injectable} from '@angular/core';
import {Product} from '../model/product';
import {ProductAttribute} from '../model/product.attribute';
import {CategoryService} from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];

  constructor(private categoryService: CategoryService) {
    const attr1: ProductAttribute = new ProductAttribute('1', 1, 'attribute1', 'value1', '1');
    const attr2: ProductAttribute = new ProductAttribute('2', 2, 'attribute2', 'value2', '2');
    const attr3: ProductAttribute = new ProductAttribute('3', 3, 'attribute3', 'value3', '3');
    const attr4: ProductAttribute = new ProductAttribute('4', 4, 'attribute4', 'value4', '4');
    const attr5: ProductAttribute = new ProductAttribute('5', 5, 'attribute5', 'value5', '5');

    const name = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

    const description = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s ' +
      'standard dummy text ever since the 1500s, when an unknown printer took a ' +
      'galley of type and scrambled it to make a type specimen book. ' +
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ' +
      'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,' +
      ' and more recently with desktop ' +
      'publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

    const images = ['assets/img/brush.jpeg', 'assets/img/brush-2.jpeg', 'assets/img/brush-3.jpeg'];


    const product1 = new Product('1', name, description, 999, 700, 20, 'UAH',
      categoryService.categories[0], [attr1, attr2, attr3, attr4, attr5], images);
    const product2 = new Product('2', name, description, 999, 700, 20, 'UAH',
      categoryService.categories[0], [attr1, attr2, attr3, attr4, attr5], images);
    const product3 = new Product('3', name, description, 999, 700, 20, 'UAH',
      categoryService.categories[0], [attr1, attr2, attr3, attr4, attr5], images);
    const product4 = new Product('4', name, description, 999, 700, 20, 'UAH',
      categoryService.categories[0], [attr1, attr2, attr3, attr4, attr5], images);
    const product5 = new Product('5', name, description, 999, 700, 20, 'UAH',
      categoryService.categories[0], [attr1, attr2, attr3, attr4, attr5], images);
    const product6 = new Product('6', name, description, 999, 700, 20, 'UAH',
      categoryService.categories[0], [attr1, attr2, attr3, attr4, attr5], images);
    const product7 = new Product('7', name, description, 999, 700, 20, 'UAH',
      categoryService.categories[0], [attr1, attr2, attr3, attr4, attr5], images);
    const product8 = new Product('8', name, description, 999, 700, 20, 'UAH',
      categoryService.categories[0], [attr1, attr2, attr3, attr4, attr5], images);

    product1.i18n['description']['ukr'] = 'alala';
    product1.i18n['description']['rus'] = 'ololo';
    product1.i18n['description']['eng'] = 'elele';
    product1.i18n['name']['ukr'] = 'alala';
    product1.i18n['name']['rus'] = 'ololo';
    product1.i18n['name']['eng'] = 'elele';

    this.products.push(...[product1, product2, product3, product4, product5, product6, product7, product8]);
  }

  getProductById(id: string) {
    return this.products.find(product => product.id === id);
  }
}
