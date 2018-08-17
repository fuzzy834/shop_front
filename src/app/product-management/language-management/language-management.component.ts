import {Component, Input, OnInit} from '@angular/core';
import {Language} from '../../../model/language';
import {LanguageService} from '../../language.service';
import {ActivatedRoute, Data} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-language-management',
  templateUrl: './language-management.component.html',
  styleUrls: ['./language-management.component.css']
})
export class LanguageManagementComponent implements OnInit {

  availableLanguages: Language[] = [];
  languages: Language[];
  language: Language;

  constructor(private route: ActivatedRoute, private languageService: LanguageService, private http: HttpClient) {
  }

  ngOnInit() {
    this.languages = this.languageService.languages;
    this.route.data.subscribe(
      (data: Data) => {
        this.availableLanguages = data['availableLanguages'];
        this.language = this.availableLanguages[0];
      }
    );
  }

  onLanguageSelected(event) {
    this.language = this.availableLanguages[event.target.selectedIndex];
    console.log(this.language);
  }

  deleteLanguage(language: Language) {
    this.http.delete('http://localhost:8080/language/delete/' + language.id).subscribe(
      () => {
        const index = this.languages.findIndex(lang => lang === language);
        this.languages.splice(index, 1);
      }
    );
  }

  addLanguage() {
    this.http.post<Language>('http://localhost:8080/language/add', this.language).subscribe(
      lang => this.languages.push(lang)
    );
  }

  resetLanguage() {
    this.language = this.availableLanguages[0];
  }
}
