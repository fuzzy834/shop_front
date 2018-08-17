import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../language.service';
import {Language} from '../../../model/language';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent implements OnInit {

  languages: Language[];
  currentLanguage: Language;

  constructor(private languageService: LanguageService, private http: HttpClient) {
  }

  ngOnInit() {
    this.languages = this.languageService.languages;
    this.languageService.lang.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  changeLanguage(event) {
    const select: HTMLSelectElement = event.target;
    const language = this.languages.find(lang => select.value === lang.code);
    this.http.get<Language>('http://localhost:8080/language/' + language.code).subscribe(
      lang => this.languageService.changeLanguage(lang)
    );
  }
}
