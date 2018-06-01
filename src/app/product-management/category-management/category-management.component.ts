import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../model/category';
import {LanguageService} from '../../language.service';
import {Language} from '../../../model/language';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  category: Category = new Category();

  @Input() categories: Category[];
  languages: Language[];
  lang: Language;

  constructor(private languageService: LanguageService) {
    this.languages = languageService.languages;
    languageService.lang.subscribe(lang => this.lang = lang);
  }

  ngOnInit() {
  }

  assignParent(parent: Category) {
    this.category.parent = parent;
  }
}
