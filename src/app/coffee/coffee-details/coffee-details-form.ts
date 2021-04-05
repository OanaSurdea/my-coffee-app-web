import { FormlyFieldConfig } from '@ngx-formly/core';
import { CoffeeTypeFormOptions } from 'src/app/core/maps/coffee-type.map';

export const coffeeFormFieldConfig: FormlyFieldConfig[] = [
  {
    className: 'section-label',
    template: '<h4 class="fs-6 fw-bold">Coffee:</h4>',
  },
  {
    fieldGroupClassName: 'card d-grid grid-auto-column gap-4 pt-2 px-3 mb-4',
    fieldGroup: [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Coffee name',
          placeholder: '',
          required: true,
        }
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'Select type',
          placeholder: '',
          required: true,
          multiple: false,
          options: CoffeeTypeFormOptions
        },
      },
    ],
  },
  {
    className: 'section-label',
    template: '<h4 class="fs-6 fw-bold">Location:</h4>',
  },
  {
    fieldGroupClassName: 'card d-grid grid-auto-column gap-4 pt-2 px-3 mb-4',
    fieldGroup: [
      {
        key: 'cafeName',
        type: 'input',
        templateOptions: {
          label: 'Cafe name',
          placeholder: '',
          required: false,
        }
      },
      {
        key: 'cafeLocation.address',
        type: 'input',
        templateOptions: {
          label: 'Cafe location - Address',
          placeholder: '',
          required: false,
        }
      },
      {
        key: 'cafeLocation.city',
        type: 'input',
        templateOptions: {
          label: 'Cafe location - City',
          placeholder: '',
          required: false,
        }
      }
    ],
  },
  {
    className: 'section-label',
    template: '<h4 class="fs-6 fw-bold">Rating:</h4>',
  },
  {
    fieldGroupClassName: 'card d-grid grid-auto-column gap-4 pt-3 px-3 mb-3',
    fieldGroup: [
      {
        key: 'rating',
        type: 'slider',
        templateOptions: {
          label: 'Rating',
          min: 1,
          max: 5,
          step: 0.5,
          thumbLabel: true,
          required: false,
        }
      },
      {
        key: 'hasTasteRating',
        type: 'toggle',
        templateOptions: {
          label: 'Show Taste Rating',
          required: false,
        }
      },
      {
        key: 'tasteRating.aroma',
        type: 'slider',
        hideExpression: (model) => !model.hasTasteRating,
        templateOptions: {
          label: 'Taste rating - Aroma',
          min: 1,
          max: 5,
          step: 0.5,
          thumbLabel: true,
          required: false,
        },
      },
      {
        key: 'tasteRating.body',
        type: 'slider',
        hideExpression: (model) => !model.hasTasteRating,
        templateOptions: {
          label: 'Taste rating - Body',
          min: 1,
          max: 5,
          step: 0.5,
          thumbLabel: true,
          required: false,
        },
      },
      {
        key: 'tasteRating.flavor',
        type: 'slider',
        hideExpression: (model) => !model.hasTasteRating,
        templateOptions: {
          label: 'Taste rating - Flavor',
          min: 1,
          max: 5,
          step: 0.5,
          thumbLabel: true,
          required: false,
        },
      },
      {
        key: 'tasteRating.intensity',
        type: 'slider',
        hideExpression: (model) => !model.hasTasteRating,
        templateOptions: {
          label: 'Taste rating - Intensity',
          min: 1,
          max: 5,
          step: 0.5,
          thumbLabel: true,
          required: false,
        },
      },
      {
        key: 'tasteRating.sweetness',
        type: 'slider',
        hideExpression: (model) => !model.hasTasteRating,
        templateOptions: {
          label: 'Taste rating - Sweetness',
          min: 1,
          max: 5,
          step: 0.5,
          thumbLabel: true,
          required: false,
        },
      },
      {
        key: 'tasteRating.aftertaste',
        type: 'slider',
        hideExpression: (model) => !model.hasTasteRating,
        templateOptions: {
          label: 'Taste rating - Aftertaste',
          min: 1,
          max: 5,
          step: 0.5,
          thumbLabel: true,
          required: false,
        },
      },
    ],
  },
  {
    className: 'section-label',
    template: '<h4 class="fs-6 fw-bold">Other:</h4>',
  },
  {
    fieldGroupClassName: 'card d-grid grid-auto-column gap-4 px-3 mb-4',
    fieldGroup: [
      {
        key: 'notes',
        type: 'textarea',
        templateOptions: {
          label: 'Notes',
          placeholder: '',
          rows: 4,
          required: false,
        }
      },
    ],
  },
];
