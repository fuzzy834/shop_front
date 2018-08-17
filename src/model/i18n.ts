import {HttpClient} from '@angular/common/http';
import {LanguageManagementComponent} from '../app/product-management/language-management/language-management.component';
import {LanguageService} from '../app/language.service';

export class I18n {
  i18n = {};

  constructor(fields?: string[]) {
    if (fields !== undefined) {
      fields.forEach(field => this.i18n[field] = []);
    }
  }
}
