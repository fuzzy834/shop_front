import { Component, OnInit, Input } from '@angular/core';
import {Attribute} from '../../../model/attribute';
import {Value} from '../../../model/value';
import {LanguageService} from '../../language.service';
import {Language} from '../../../model/language';
import {Category} from '../../../model/category';

@Component({
  selector: 'app-attribute-management',
  templateUrl: './attribute-management.component.html',
  styleUrls: ['./attribute-management.component.css']
})
export class AttributeManagementComponent implements OnInit {

  langIndex: number;
  attribute: Attribute = new Attribute();

  @Input() attributes: Attribute[];
  @Input() categories: Category[];

  constructor(private languageService: LanguageService) {
    const languages: Language[] = languageService.languages;
    this.languageService.lang.subscribe(lang => this.langIndex = languages.findIndex(l => l.code === lang.code));
    this.attribute.values = [];
  }

  ngOnInit() {
  }

  addValue(value: Value) {
    this.attribute.values.push(value);
  }

}
