import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHistoryDetailsComponent } from './purchase-history-details.component';

describe('PurchaseHistoryDetailsComponent', () => {
  let component: PurchaseHistoryDetailsComponent;
  let fixture: ComponentFixture<PurchaseHistoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseHistoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
