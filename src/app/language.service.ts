import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from '../model/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: BehaviorSubject<Language> = new BehaviorSubject(null);
  lang = this.language.asObservable();

  languages: Language[] = [
    new Language('1', 'ukr', 'Українська'),
    new Language('2', 'rus', 'Русский'),
    new Language('3', 'eng', 'English')
  ];

  constructor() {
  }

  changeLanguage(lang: Language) {
    this.language.next(lang);
  }
}
