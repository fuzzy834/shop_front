import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../model/category';
import {CategoryService} from '../../category.service';

@Component({
  selector: 'app-categories-selector',
  templateUrl: './categories-selector.component.html',
  styleUrls: ['./categories-selector.component.css']
})
export class CategoriesSelectorComponent implements OnInit {

  categoriesFlat: Category[] = [];

  @Input() selectedId: string;
  @Output() selection = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoriesFlat = this.categoryService.flatCategories;
  }

  onCategorySelected(event) {
    const id: string = event.target.value;
    const category: Category = this.categoriesFlat.find(c => c.id === id);
    this.selection.emit(category);
  }
}
