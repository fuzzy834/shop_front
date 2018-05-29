import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductAttribute } from '../../model/product.attribute';
import { FormsModule } from '@angular/forms';
import {Category} from '../../model/category';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product;
  hidden = false;

  constructor() {
  }

  ngOnInit() {
    const attr1: ProductAttribute = new ProductAttribute('1', 1, 'attribute1', 'value1');
    const attr2: ProductAttribute = new ProductAttribute('2', 2, 'attribute2', 'value2');
    const attr3: ProductAttribute = new ProductAttribute('3', 3, 'attribute3', 'value3');
    const attr4: ProductAttribute = new ProductAttribute('4', 4, 'attribute4', 'value4');
    const attr5: ProductAttribute = new ProductAttribute('5', 5, 'attribute5', 'value5');

    const category: Category = new Category('1', 'category1', '', [], []);

    const name = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

    const description = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s ' +
      'standard dummy text ever since the 1500s, when an unknown printer took a ' +
      'galley of type and scrambled it to make a type specimen book. ' +
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ' +
      'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,' +
      ' and more recently with desktop ' +
      'publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

    const images = [
      'assets/img/brush.jpeg',
      'assets/img/brush-2.jpeg',
      'assets/img/brush-3.jpeg',
    ];

    this.product = new Product('1', name, description, 999, 700, 20, 'UAH', category, [attr1, attr2, attr3, attr4, attr5], images);
  }

  getPriceWithDiscount(price: number) {
    const discountPrice: number = price - (price * (this.product.discount / 100));
    const decimalPoints: any = 2;
    return (discountPrice).toFixed(decimalPoints);
  }

  changeText(event) {
    const detailed: HTMLElement = event.target;
    const icon = '<i class="fa fa-info-circle"></i>&nbsp;&nbsp;';
    if (this.hidden) {
      this.hidden = false;
      detailed.innerHTML = icon + ' Показати деталі';
    } else {
      this.hidden = true;
      detailed.innerHTML = icon + ' Приховати деталі';
    }
  }
}
