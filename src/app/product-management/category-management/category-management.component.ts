import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../../model/category';
import {LanguageService} from '../../language.service';
import {Language} from '../../../model/language';
import {Attribute} from '../../../model/attribute';
import {CategoriesSelectorComponent} from '../categories-selector/categories-selector.component';
import {AttributeService} from '../../attribute.service';
import {CategoryService} from '../../category.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  category: Category = new Category();

  categories: Category[];
  attributes: Attribute[];

  @ViewChild(CategoriesSelectorComponent) categoriesSelector: CategoriesSelectorComponent;

  languages: Language[];
  lang: Language;

  constructor(private cd: ChangeDetectorRef,
              private languageService: LanguageService,
              private attributeService: AttributeService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.category.attributes = [];
    this.languages = this.languageService.languages;
    this.languageService.lang.subscribe(lang => this.lang = lang);
    this.attributes = this.attributeService.attributes;
    this.categories = this.categoryService.categories;
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
