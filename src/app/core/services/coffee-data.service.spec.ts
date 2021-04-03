import { TestBed } from '@angular/core/testing';

import { CoffeeDataService } from './coffee-data.service';

describe('CoffeeDataService', () => {
  let service: CoffeeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
