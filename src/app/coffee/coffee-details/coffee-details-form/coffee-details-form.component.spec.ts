import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeDetailsFormComponent } from './coffee-details-form.component';

describe('CoffeeDetailsFormComponent', () => {
  let component: CoffeeDetailsFormComponent;
  let fixture: ComponentFixture<CoffeeDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
