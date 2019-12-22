import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadTransactionComponent } from './bad-transaction.component';

describe('BadTransactionComponent', () => {
  let component: BadTransactionComponent;
  let fixture: ComponentFixture<BadTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
