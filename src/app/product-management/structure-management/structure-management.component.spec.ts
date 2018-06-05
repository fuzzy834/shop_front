import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureManagementComponent } from './structure-management.component';

describe('StructureManagementComponent', () => {
  let component: StructureManagementComponent;
  let fixture: ComponentFixture<StructureManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
