import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Language} from '../model/language';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService implements OnInit, Resolve<Language[]> {

  languages: Language[] = [];
  language: BehaviorSubject<Language> = new BehaviorSubject<Language>(new Language());
  lang = this.language.asObservable();
  i18n = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    console.log(this.i18n);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Language[]> {
    return this.getAvailableLanguages();
  }

  getAvailableLanguages() {
    return this.http.get<Language[]>('http://localhost:8080/language/locales');
  }

  getCurrentLanguage() {
    return new Promise((resolve) => {
      this.http.get<Language>('http://localhost:8080/language')
        .subscribe(response => {
          this.getI18n(response.code);
          this.changeLanguage(response);
          resolve(true);
        });
    });
  }

  getLanguages() {
    return new Promise((resolve) => {
      this.http.get<Language[]>('http://localhost:8080/language/all')
        .subscribe(response => {
          this.languages = response;
          resolve(true);
        });
    });
  }

  getI18n(code: string) {
    this.http.get('http://localhost:8080/language/i18n/' + code)
      .subscribe(i18n => {
        this.i18n = i18n;
      });
  }

  changeLanguage(lang: Language) {
    this.getI18n(lang.code);
    this.language.next(lang);
  }
}


export function languageProviderFactory(languageService: LanguageService) {
  return () => languageService.getLanguages();
}

export function currentLanguageProviderFactory(languageService: LanguageService) {
  return () => languageService.getCurrentLanguage();
}
