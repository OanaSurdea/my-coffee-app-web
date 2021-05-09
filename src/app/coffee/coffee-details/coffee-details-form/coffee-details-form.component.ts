import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormOption } from 'src/app/core/interfaces';
import { CoffeeTypeFormOptions } from 'src/app/core/maps';
import { CoffeeTypeEnum } from '../../enums';
import { Coffee } from '../../models';

@Component({
  selector: 'mca-coffee-details-form',
  templateUrl: './coffee-details-form.component.html',
  styleUrls: ['./coffee-details-form.component.scss']
})
export class CoffeeDetailsFormComponent implements OnInit, OnChanges {
  mainForm: FormGroup;

  // About-coffee form
  aboutForm: FormGroup;
  coffeeTypeOptions: IFormOption<CoffeeTypeEnum, string>[] = CoffeeTypeFormOptions;

  @Input() coffee: Coffee;

  constructor(
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.initMainForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.populateAboutForm(this.coffee);
  }

  private initAboutForm(): void {
    this.aboutForm = this.fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      imageUrl: [null],
      notes: [null],
    });
  }

  private initMainForm(): void {
    this.initAboutForm();

    this.mainForm = this.fb.group({
      about: this.aboutForm,
      cafeLocation: [],
      ratings: [],
    });
  }

  private populateAboutForm(coffee: Coffee): void {
    if (this.mainForm) {
      this.mainForm.get('about.name').setValue(coffee.name);
      this.mainForm.get('about.type').setValue(coffee.type);
      this.mainForm.get('about.imageUrl').setValue(coffee.imageUrl);
      this.mainForm.get('about.notes').setValue(coffee.notes);
    }
  }

  public uploadPicture(): void {

  }

  public submitForm(coffee: Coffee): void {
    alert('Submited: ' + JSON.stringify(coffee));

    // this.requestGeolocation();

    // this.coffee.id = this.coffeeRouteId;

    // this.coffeeDataService.saveOne(coffee, success => {
    //   if (success) {
    //     this.router.navigateByUrl('/');
    //   }
    // });
  }


  public resetForm(): void {
    this.mainForm.reset();
  }

}
