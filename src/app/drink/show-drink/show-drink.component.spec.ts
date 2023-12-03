import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDrinkComponent } from './show-drink.component';

describe('ShowDrinkComponent', () => {
  let component: ShowDrinkComponent;
  let fixture: ComponentFixture<ShowDrinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDrinkComponent]
    });
    fixture = TestBed.createComponent(ShowDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
