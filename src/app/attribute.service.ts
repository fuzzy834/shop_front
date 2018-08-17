import {Injectable, OnDestroy} from '@angular/core';
import {Attribute} from '../model/attribute';
import {Value} from '../model/value';
import {HttpClient} from '@angular/common/http';
import {Language} from '../model/language';
import {LanguageService} from './language.service';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeService implements OnDestroy {

  attributes: Attribute[] = [];
  language: Language;
  subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private languageService: LanguageService) {
    this.subscriptions.push(languageService.lang.subscribe(language => this.language = language));
  }

  getAttributes() {
    return new Promise(resolve => {
      this.http.get('http://localhost:8080/attributes').subscribe(response => {
        this.buildAttributes(response);
        resolve(true);
      });
    });
  }

  buildAttributes(json: any) {
    for (const a of json) {
      const attribute = new Attribute();
      attribute.id = a.attributeId;
      attribute.priority = a.priority;
      if (a.name.translated) {
        attribute.name = a.name.localizedName[this.language.code];
        attribute.i18n['name'] = a.name.localizedName;
        this.subscriptions.push(this.languageService.lang.subscribe(
          language => {
            attribute.name = attribute.i18n['name'][language.code];
          }
        ));
      } else {
        attribute.name = a.name.nonLocalizedName;
      }
      attribute.values = [];
      for (const v of a.values) {
        attribute.values.push(this.buildAttributeValue(v));
      }
      this.attributes.push(attribute);
    }
  }

  buildAttributeValue(json: any): Value {
      const value = new Value();
      value.id = json.id;
      if (json.translated) {
        value.value = json.localizedName[this.language.code];
        value.i18n['value'] = json.localizedName;
        this.subscriptions.push(this.languageService.lang.subscribe(
          language => {
            value.value = value.i18n['value'][language.code];
          }
        ));
      } else {
        value.value = json.value;
      }
      return value;
  }

  findAttributeById(id: string): Attribute {
    return this.attributes.find(attribute => attribute.id === id);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
