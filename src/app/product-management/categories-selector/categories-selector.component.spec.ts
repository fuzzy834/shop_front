import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSelectorComponent } from './categories-selector.component';

describe('CategoriesSelectorComponent', () => {
  let component: CategoriesSelectorComponent;
  let fixture: ComponentFixture<CategoriesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
