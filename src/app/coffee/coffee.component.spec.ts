import { MaterialUiModule } from './../core/modules/material-ui.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormlyPluginModule } from '../core/modules/formly-plugin.module';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';

import { CoffeeComponent } from './coffee.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('CoffeeComponent', () => {
  let component: CoffeeComponent;
  let fixture: ComponentFixture<CoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        MaterialUiModule,
        FormlyPluginModule,
      ],
      declarations: [
        CoffeeComponent,
        CoffeeListComponent,
        CoffeeDetailsComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
