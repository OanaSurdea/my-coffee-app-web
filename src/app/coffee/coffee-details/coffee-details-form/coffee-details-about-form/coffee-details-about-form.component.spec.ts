import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeDetailsAboutFormComponent } from './coffee-details-about-form.component';


describe('CoffeeDetailsAboutFormComponent', () => {
  let component: CoffeeDetailsAboutFormComponent;
  let fixture: ComponentFixture<CoffeeDetailsAboutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoffeeDetailsAboutFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeDetailsAboutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
