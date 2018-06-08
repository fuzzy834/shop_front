import {Component, Input, OnInit} from '@angular/core';
import {Language} from '../../../model/language';
import {LanguageService} from '../../language.service';

@Component({
  selector: 'app-language-management',
  templateUrl: './language-management.component.html',
  styleUrls: ['./language-management.component.css']
})
export class LanguageManagementComponent implements OnInit {

  language: Language = new Language();

  languages: Language[];

  constructor(private languageService: LanguageService) {
  }

  ngOnInit() {
    this.languages = this.languageService.languages;
  }

  deleteLanguage(language: Language) {
    const index = this.languages.findIndex(lang => lang === language);
    this.languages.splice(index, 1);
  }

  addLanguage(language: Language) {
    const index = this.languages.findIndex(lang => lang.id === this.language.id);
    if (language.id === undefined) {
      this.languages.push(language);
    } else {
      this.languages[index] = language;
    }
  }

  editLanguage(language: Language) {
    this.language = language;
  }

  resetLanguage() {
    this.language = new Language();
  }
}
