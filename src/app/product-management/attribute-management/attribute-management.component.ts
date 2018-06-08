import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Attribute} from '../../../model/attribute';
import {Value} from '../../../model/value';
import {LanguageService} from '../../language.service';
import {Category} from '../../../model/category';
import {AttributeValueComponent} from './attribute-value/attribute-value.component';
import {Language} from '../../../model/language';
import {FormControl} from '@angular/forms';
import {AttributeService} from '../../attribute.service';
import {CategoryService} from '../../category.service';

@Component({
  selector: 'app-attribute-management',
  templateUrl: './attribute-management.component.html',
  styleUrls: ['./attribute-management.component.css']
})
export class AttributeManagementComponent implements OnInit {

  languages: Language[];
  attributes: Attribute[];
  categories: Category[];
  attribute: Attribute = new Attribute();
  editedValue = [];

  @ViewChild(AttributeValueComponent) attrVal: AttributeValueComponent;
  @ViewChild('modalTrigger') modalTrigger: ElementRef;

  constructor(private languageService: LanguageService,
              private attributeService: AttributeService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.languages = this.languageService.languages;
    this.attributes = this.attributeService.attributes;
    this.categories = this.categoryService.categories;
    this.attribute.values = [];
  }

  addValue(value: Value) {
    this.attribute.values.push(value);
  }

  deleteValue(value: Value) {
    const index = this.attribute.values.findIndex(val => val === value);
    this.attribute.values.splice(index, 1);
  }

  editValue(value: Value, editControls: HTMLElement) {
    this.languages.forEach(l => this.editedValue[l.code] = value.i18n['value'][l.code]);
    this.attrVal.editValue(value);
    editControls.hidden = false;
  }

  confirmEdit(editControls: HTMLElement) {
    editControls.hidden = true;
    this.attrVal.confirmEdit();
    this.editedValue = [];
  }

  discardEdit(editControls: HTMLElement) {
    editControls.hidden = true;
    this.attrVal.discardEdit(this.editedValue);
    this.editedValue = [];
  }

  assignCategory(value: Value, category: Category) {
    value.categoryId = category.id;
  }

  createNewAttribute() {
    this.attribute = new Attribute();
    this.attribute.values = [];
  }

  editAttribute(attribute: Attribute) {
    this.modalTrigger.nativeElement.click();
    this.attribute = attribute;
  }

  deleteAttribute(attribute: Attribute) {
    console.log(this.attribute);
  }

  saveAttribute() {
    console.log(this.attribute);
  }
}
