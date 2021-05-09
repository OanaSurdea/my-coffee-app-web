import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeDetailsLocationFormComponent } from './coffee-details-location-form.component';

describe('CoffeeDetailsLocationFormComponent', () => {
  let component: CoffeeDetailsLocationFormComponent;
  let fixture: ComponentFixture<CoffeeDetailsLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeDetailsLocationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDetailsLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
