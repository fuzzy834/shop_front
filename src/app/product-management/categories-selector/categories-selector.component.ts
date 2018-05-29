import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Category} from '../../../model/category';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.css']
})
export class CategoriesSelectorComponent implements OnInit {

  @Input() categories: Category[];
  @Output() selection = new EventEmitter<Category>();
  categoriesFlat: Category[] = [];

  constructor() {
  }

  ngOnInit() {
    this.flatCategories(this.categories);
  }

  flatCategories(categories: Category[]) {
    for (const item of categories) {
      this.categoriesFlat.push(item);
      if (item.children.length > 0) {
        this.flatCategories(item.children);
      }
    }
  }

  onCategorySelected(event) {
    const id: string = event.target.value;
    const category: Category = this.categoriesFlat.find(c => c.id === id);
    this.selection.emit(category);
  }

}