import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Attribute } from '../../../model/attribute';
import { Value } from '../../../model/value';
import { LanguageService } from '../../language.service';
import { Category } from '../../../model/category';
import { AttributeValueComponent } from './attribute-value/attribute-value.component';
import {Language} from '../../../model/language';

@Component({
  selector: 'app-attribute-management',
  templateUrl: './attribute-management.component.html',
  styleUrls: ['./attribute-management.component.css']
})
export class AttributeManagementComponent implements OnInit {

  languages: Language[];
  attribute: Attribute = new Attribute();

  @Input() attributes: Attribute[];
  @Input() categories: Category[];
  @ViewChild(AttributeValueComponent) attrVal: AttributeValueComponent;

  constructor(private languageService: LanguageService) {
    this.languages = languageService.languages;
    // this.languageService.lang.subscribe(lang => this.lang = lang.code);
    this.attribute.values = [];
  }

  ngOnInit() {
  }

  addValue(value: Value) {
    this.attribute.values.push(value);
  }

  deleteValue(value: Value) {
    const index = this.attribute.values.findIndex(val => val === value);
    this.attribute.values.splice(index, 1);
  }

  editValue(value: Value) {
    this.attrVal.editValue(value);
  }
}
