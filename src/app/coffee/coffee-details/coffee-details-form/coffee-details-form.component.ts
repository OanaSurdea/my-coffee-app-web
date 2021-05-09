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
  locationForm: FormGroup;
  coffeeTypeOptions: IFormOption<CoffeeTypeEnum, string>[] = CoffeeTypeFormOptions;

  @Input() coffee: Coffee;

  constructor(
    private fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.initMainForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.populateMainForm(this.coffee);
  }

  //#region initForms
  private initAboutForm(): void {
    this.aboutForm = this.fb.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      imageUrl: [null],
      notes: [null],
    });
  }

  private initLocationForm(): void {
    this.locationForm = this.fb.group({
      name: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      latitude: [null],
      longitude: [null],
    });
  }

  private initMainForm(): void {
    this.initAboutForm();
    this.initLocationForm();

    this.mainForm = this.fb.group({
      about: this.aboutForm,
      location: this.locationForm,
      ratings: [],
    });
  }
  //#endregion initForms

  //#region populateForms
  private populateAboutForm(coffee: Coffee): void {
    if (this.mainForm) {
      this.mainForm.get('about.name').setValue(coffee.name);
      this.mainForm.get('about.type').setValue(coffee.type);
      this.mainForm.get('about.imageUrl').setValue(coffee.imageUrl);
      this.mainForm.get('about.notes').setValue(coffee.notes);
    }
  }

  private populateLocationForm(coffee: Coffee): void {
    if (this.mainForm) {
      this.mainForm.get('location.name').setValue(coffee.cafeName);
      this.mainForm.get('location.address').setValue(coffee.cafeLocation.address);
      this.mainForm.get('location.city').setValue(coffee.cafeLocation.city);
      this.mainForm.get('location.latitude').setValue(coffee.cafeLocation.latitude);
      this.mainForm.get('location.longitude').setValue(coffee.cafeLocation.longitude);
    }
  }

  private populateMainForm(coffee: Coffee): void {
    this.populateAboutForm(coffee);
    this.populateLocationForm(coffee);
  }
  //#endregion populateForms


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
