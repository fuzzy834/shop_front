import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../language.service';
import {Language} from '../../../model/language';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent implements OnInit {

  languages: Language[] = this.languageService.languages;
  currentLanguage: Language = this.languages[0];

  constructor(private languageService: LanguageService) {
    this.languageService.changeLanguage(this.currentLanguage);
  }

  ngOnInit() {
  }

  changeLanguage(event) {
    const select: HTMLSelectElement = event.target;
    this.currentLanguage = this.languages.find(lang => select.value === lang.code);
    this.languageService.changeLanguage(this.currentLanguage);
  }
}
