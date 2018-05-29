import {Component, OnInit} from '@angular/core';
import {Value} from '../../model/value';
import {Attribute} from '../../model/attribute';
import {Category} from '../../model/category';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css']
})
export class PageContentComponent implements OnInit {

  categories: Category[];
  attributes: Attribute[];

  constructor() {
  }

  ngOnInit() {
    const v1: Value = new Value('1', 'value1');
    const v2: Value = new Value('2', 'value2');
    const v3: Value = new Value('3', 'value3');
    const v4: Value = new Value('4', 'value4');
    const v5: Value = new Value('5', 'value5');

    const values: Value[] = [v1, v2, v3, v4, v5];

    const a1 = new Attribute('1', 'attribute1', 1, values);
    const a2 = new Attribute('2', 'attribute2', 2, values);
    const a3 = new Attribute('3', 'attribute3', 3, values);
    const a4 = new Attribute('4', 'attribute4', 4, values);
    const a5 = new Attribute('5', 'attribute5', 5, values);

    const attributes: Attribute[] = [a1, a2, a3, a4, a5];

    this.attributes = attributes;

    const c1: Category = new Category('1', 'category1', '', attributes, []);
    const c2: Category = new Category('2', 'category2', c1.id, attributes, []);
    const c3: Category = new Category('3', 'category3', c2.id, attributes, []);
    const c4: Category = new Category('4', 'category4', c3.id, attributes, []);
    const c5: Category = new Category('5', 'category5', c4.id, attributes, []);

    c1.children.push(c2);
    c2.children.push(c3);
    c3.children.push(c4);
    c4.children.push(c5);

    const c6: Category = new Category('6', 'category6', '', attributes, []);
    const c7: Category = new Category('7', 'category7', c6.id, attributes, []);
    const c8: Category = new Category('8', 'category8', c7.id, attributes, []);
    const c9: Category = new Category('9', 'category9', c8.id, attributes, []);
    const c10: Category = new Category('10', 'category10', c9.id, attributes, []);

    c6.children.push(c7);
    c7.children.push(c8);
    c8.children.push(c9);
    c9.children.push(c10);

    this.categories = [c1, c6];
  }

}
