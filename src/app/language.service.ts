import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Language} from '../model/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  lang: BehaviorSubject<Language> = new BehaviorSubject(null);

  languages: Language[] = [
    new Language('ukr', 'Українська'),
    new Language('rus', 'Русский'),
    new Language('eng', 'English')
  ];

  constructor() {
  }

  changeLanguage(lang: Language) {
    this.lang.next(lang);
  }
}
