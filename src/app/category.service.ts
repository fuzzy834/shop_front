import {Injectable, OnDestroy} from '@angular/core';
import {Category} from '../model/category';
import {AttributeService} from './attribute.service';
import {LanguageService} from './language.service';
import {HttpClient} from '@angular/common/http';
import {Language} from '../model/language';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnDestroy {

  categories: Category[] = [];
  flatCategories: Category[] = [];
  language: Language;
  subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private attributeService: AttributeService, private languageService: LanguageService) {
    this.subscriptions.push(languageService.lang.subscribe(language => this.language = language));
  }

  getCategories() {
    return new Promise((resolve) => {
      this.http.get('http://localhost:8080/categories').subscribe((response) => {
          this.attributeService.getAttributes().then(() => {
            this.resolveCategories(response);
            resolve(true);
          });
        });
    });
  }

  resolveCategories(json: any, parent?: Category) {
    for (const c of json) {
      const category = this.resolveCategory(c);
      let index = -1;
      if (parent !== undefined) {
        index = parent.children.findIndex(ca => ca.id === category.id);
        if (index === -1) {
          parent.children.push(category);
        } else {
          parent.children[index] = category;
        }
        parent.children.forEach(child => child.parent = parent);
      } else {
        index = this.categories.findIndex(ca => ca.id === category.id);
        if (index === -1) {
          this.categories.push(category);
        } else {
          this.categories[index] = category;
        }
      }
      index = this.flatCategories.findIndex(ca => ca.id === category.id);
      if (index === -1) {
        this.flatCategories.push(category);
      } else {
        this.flatCategories[index] = category;
      }
    }
  }

  resolveCategory(c: any) {
    const category: Category = new Category();
    category.id = c.id;
    category.children = [];
    if (c.name.translated) {
      category.name = c.name.localizedName[this.language.code];
      category.i18n['name'] = c.name.localizedName;
      this.subscriptions.push(this.languageService.lang.subscribe(
        language => {
          category.name = category.i18n['name'][language.code];
        }
      ));
    } else {
      category.name = c.name.nonLocalizedName;
    }
    category.attributes = [];
    if (c.hasOwnProperty('attributes')) {
      for (const a of c.attributes) {
        const attr = this.attributeService.findAttributeById(a);
        category.attributes.push(attr);
      }
    }
    if (c.hasOwnProperty('children')) {
      this.resolveCategories(c.children, category);
    }
    return category;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

export function categoriesProviderFactory(categoryService: CategoryService) {
  return () => categoryService.getCategories();
}
