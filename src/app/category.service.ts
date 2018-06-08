import {Injectable} from '@angular/core';
import {Category} from '../model/category';
import {AttributeService} from './attribute.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [];

  constructor(private attributeService: AttributeService) {
    const c1: Category = new Category('1', 'category1', null, [attributeService.attributes[0]], []);
    const c2: Category = new Category('2', 'category2', c1, [attributeService.attributes[1]], []);
    const c3: Category = new Category('3', 'category3', c2, [attributeService.attributes[2]], []);
    const c4: Category = new Category('4', 'category4', c3, [attributeService.attributes[3]], []);
    const c5: Category = new Category('5', 'category5', c4, [attributeService.attributes[4]], []);

    c1.children.push(c2);
    c2.children.push(c3);
    c3.children.push(c4);
    c4.children.push(c5);

    this.categories.push(c1);
  }
}
