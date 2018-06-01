import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatedInputComponent } from './translated-input.component';

describe('TranslatedInputComponent', () => {
  let component: TranslatedInputComponent;
  let fixture: ComponentFixture<TranslatedInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatedInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
