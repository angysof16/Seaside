import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDestacadoComponent } from './menu-destacado.component';

describe('MenuDestacadoComponent', () => {
  let component: MenuDestacadoComponent;
  let fixture: ComponentFixture<MenuDestacadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuDestacadoComponent]
    });
    fixture = TestBed.createComponent(MenuDestacadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
