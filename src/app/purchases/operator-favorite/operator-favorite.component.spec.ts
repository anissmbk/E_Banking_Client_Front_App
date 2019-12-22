import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorFavoriteComponent } from './operator-favorite.component';

describe('OperatorFavoriteComponent', () => {
  let component: OperatorFavoriteComponent;
  let fixture: ComponentFixture<OperatorFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
