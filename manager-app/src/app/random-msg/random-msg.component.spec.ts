import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMsgComponent } from './random-msg.component';

describe('RandomMsgComponent', () => {
  let component: RandomMsgComponent;
  let fixture: ComponentFixture<RandomMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
