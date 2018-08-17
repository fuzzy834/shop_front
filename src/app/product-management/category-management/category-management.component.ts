import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Category} from '../../../model/category';
import {LanguageService} from '../../language.service';
import {Language} from '../../../model/language';
import {Attribute} from '../../../model/attribute';
import {CategoriesSelectorComponent} from '../categories-selector/categories-selector.component';
import {AttributeService} from '../../attribute.service';
import {CategoryService} from '../../category.service';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import {TranslatableFieldComponent} from '../translatable-field/translatable-field.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit, OnDestroy {

  categoryForm = new FormGroup({});
  category: Category = new Category();
  categoriesFlat: Category[];
  attributes: Attribute[];

  @ViewChild('parentSelect') parentSelect: ElementRef;
  @ViewChild(CategoriesSelectorComponent) categoriesSelector: CategoriesSelectorComponent;
  @ViewChild(TranslatableFieldComponent) translatableFiled: TranslatableFieldComponent;

  languages: Language[];
  lang: Language;

  subscriptions: Subscription[] = [];

  constructor(private cd: ChangeDetectorRef,
              private languageService: LanguageService,
              private attributeService: AttributeService,
              private categoryService: CategoryService,
              private http: HttpClient) {
    const langSubscription = this.languageService.lang.subscribe(lang => this.lang = lang);
    this.subscriptions.push(langSubscription);
    this.category.attributes = [];
  }

  ngOnInit() {
    this.languages = this.languageService.languages;
    this.attributes = this.attributeService.attributes;
    this.categoriesFlat = this.categoryService.flatCategories;
    this.categoryForm.addControl('parent', new FormControl());
    this.categoryForm.addControl('attributes', new FormArray([]));
  }

  getAssignableParents() {
    if (this.category.id === undefined) {
      return this.categoriesFlat;
    } else {
      const categories: Category[] = [];
      for (const c of this.categoriesFlat) {
        if (c.id !== this.category.id && this.isAssignable(c, this.category)) {
          categories.push(c);
        }
      }
      return categories;
    }
  }

  isAssignable(current: Category, category: Category) {
    for (const child of category.children) {
      if (child.id === current.id) {
        return false;
      }
      if (child.children.length > 0) {
        return this.isAssignable(current, child);
      }
    }
    return true;
  }

  assignParent(parent: Category) {
    this.category.parent = parent;
  }

  addAttribute(id: string) {
    const attributes: FormArray = <FormArray> this.categoryForm.get('attributes');
    const index = attributes.controls.findIndex(attr => attr.value.id === id);
    if (index === -1) {
      const attribute: Attribute = this.attributes.find(attr => attr.id === id);
      const control: FormControl = new FormControl();
      control.setValue(attribute);
      attributes.push(control);
    }
  }

  deleteAttribute(id: string) {
    const attributes: FormArray = <FormArray> this.categoryForm.get('attributes');
    const index = attributes.controls.findIndex(attr => attr.value.id === id);
    attributes.removeAt(index);
  }

  editCategory(category: Category) {
    const attributes: FormArray = new FormArray([]);
    this.categoryForm.removeControl('attributes');
    this.categoryForm.addControl('attributes', attributes);
    if (category === null) {
      this.translatableFiled.translated = false;
      this.category = new Category();
      this.category.attributes = [];
      this.categoryForm.get('parent').setValue(null);
    } else {
      this.translatableFiled.translated = category.i18n['name'][this.lang.code] !== undefined;
      this.category = category;
      if (category.parent !== undefined) {
        this.categoryForm.get('parent').setValue(category.parent);
      }
      category.attributes.map(attribute => {
        const control = new FormControl();
        control.setValue(attribute);
        return control;
      }).forEach(control => attributes.push(control));
    }
    this.translatableFiled.object = this.category;
    this.translatableFiled.rebuildFormGroup();
  }

  resetForm() {
    this.editCategory(this.category);
  }

  deleteCategory(category: Category) {
    this.http.delete('http://localhost:8080/categories/' + category.id + '/false').subscribe(() => {
      let index;
      if (category.parent !== undefined) {
        index = category.parent.children.findIndex(c => c.id === category.id);
        category.parent.children.splice(index, 1);
      } else {
        index = this.categoryService.categories.findIndex(c => c.id === category.id);
        this.categoryService.categories.splice(index, 1);
      }
      index = this.categoriesFlat.findIndex(c => c.id === category.id);
      this.categoriesFlat.splice(index, 1);
    });
  }

  submitForm() {
    console.log(this.categoryForm);
    const id = this.category.id;
    const parent = this.categoryForm.get('parent').value;
    const translated: boolean = this.categoryForm.get('i18n.name.translated').value;
    let name = {};
    if (translated) {
      this.languages.forEach(language => {
        name[language.code] = this.categoryForm.get('i18n.name.name-' + language.code).value;
      });
    } else {
      name = this.categoryForm.get('i18n.name.name').value;
    }
    const attributes = (<FormArray> this.categoryForm.get('attributes'))
      .controls.map(control => control.value.id);
    const dto = {
      categoryId: id,
      name: name,
      translated: translated,
      parent: parent === null ? '' : parent.id,
      attributes: attributes
    };
    if (id === undefined) {
      const url = 'http://localhost:8080/categories/create';
      this.http.post(url, dto)
        .subscribe(() => this.categoryService.getCategories());
    } else {
      const url = 'http://localhost:8080/categories/edit';
      this.http.put(url, dto)
        .subscribe(() => this.categoryService.getCategories());
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
