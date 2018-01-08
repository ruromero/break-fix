import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBtnComponent } from './menu-btn.component';

describe('MenuBtnComponent', () => {
  let component: MenuBtnComponent;
  let fixture: ComponentFixture<MenuBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
