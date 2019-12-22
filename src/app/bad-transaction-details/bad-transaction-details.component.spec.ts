import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadTransactionDetailsComponent } from './bad-transaction-details.component';

describe('BadTransactionDetailsComponent', () => {
  let component: BadTransactionDetailsComponent;
  let fixture: ComponentFixture<BadTransactionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadTransactionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
