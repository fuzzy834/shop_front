import {Component, OnInit, Input, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {I18n} from '../../../model/i18n';
import {Language} from '../../../model/language';
import {LanguageService} from '../../language.service';

@Component({
  selector: 'app-translated-input',
  templateUrl: './translated-input.component.html',
  styleUrls: ['./translated-input.component.css']
})
export class TranslatedInputComponent implements OnInit, AfterViewInit {

  @Input() obj: I18n;
  @Input() name: string;
  @Input() title: string;
  @Input() textarea: boolean;

  lang: Language;
  languages: Language[];

  constructor(private cd: ChangeDetectorRef, private languageService: LanguageService) {
    this.languages = languageService.languages;
    languageService.lang.subscribe(lang => this.lang = lang);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
