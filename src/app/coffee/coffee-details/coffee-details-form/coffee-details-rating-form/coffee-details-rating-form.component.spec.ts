import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeDetailsRatingFormComponent } from './coffee-details-rating-form.component';

describe('CoffeeDetailsRatingFormComponent', () => {
  let component: CoffeeDetailsRatingFormComponent;
  let fixture: ComponentFixture<CoffeeDetailsRatingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeDetailsRatingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDetailsRatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
