import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanosComponent } from './visitanos.component';

describe('VisitanosComponent', () => {
  let component: VisitanosComponent;
  let fixture: ComponentFixture<VisitanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitanosComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(VisitanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
