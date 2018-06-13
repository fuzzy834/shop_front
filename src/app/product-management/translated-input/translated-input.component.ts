import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {I18n} from '../../../model/i18n';
import {Language} from '../../../model/language';
import {LanguageService} from '../../language.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-translated-input',
  templateUrl: './translated-input.component.html',
  styleUrls: ['./translated-input.component.css']
})
export class TranslatedInputComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() obj: I18n;
  @Input() name: string;
  @Input() title: string;
  @Input() textarea: boolean;

  lang: Language;
  languages: Language[];

  subscriptions: Subscription[] = [];

  constructor(private cd: ChangeDetectorRef, private languageService: LanguageService) {
    this.languages = languageService.languages;
    const langSubscription = languageService.lang.subscribe(lang => this.lang = lang);
    this.subscriptions.push(langSubscription);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
