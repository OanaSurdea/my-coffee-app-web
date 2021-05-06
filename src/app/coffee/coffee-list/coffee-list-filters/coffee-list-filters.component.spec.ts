import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeListFiltersComponent } from './coffee-list-filters.component';


describe('CoffeeListFiltersComponent', () => {
  let component: CoffeeListFiltersComponent;
  let fixture: ComponentFixture<CoffeeListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoffeeListFiltersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
