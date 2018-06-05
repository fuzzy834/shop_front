import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../../model/category';
import {LanguageService} from '../../language.service';
import {Language} from '../../../model/language';
import {Attribute} from '../../../model/attribute';
import {CategoriesSelectorComponent} from '../categories-selector/categories-selector.component';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  category: Category = new Category();

  @Input() categories: Category[];
  @Input() attributes: Attribute[];
  @ViewChild(CategoriesSelectorComponent) categoriesSelector: CategoriesSelectorComponent;

  languages: Language[];
  lang: Language;

  constructor(private cd: ChangeDetectorRef, private languageService: LanguageService) {
    this.category.attributes = [];
    this.languages = languageService.languages;
    languageService.lang.subscribe(lang => this.lang = lang);
  }

  ngOnInit() {
  }

  assignParent(parent: Category) {
    this.category.parent = parent;
  }

  addAttribute(id: string) {
    const index = this.category.attributes.findIndex(attr => attr.id === id);
    if (index === -1) {
      const attribute: Attribute = this.attributes.find(attr => attr.id === id);
      this.category.attributes.push(attribute);
    }
  }

  deleteAttribute(id: string) {
    const index = this.category.attributes.findIndex(attr => attr.id === id);
    this.category.attributes.splice(index, 1);
  }

  editCategory(category: Category) {
    if (category === null) {
      this.category = new Category();
      this.category.attributes = [];
    } else {
      this.category = category;
    }
  }

  deleteCategory(category: Category) {
    console.log(category.id);
  }
}
