import { CafeLocation } from 'src/app/models/cafe-location.model';
import { TestBed } from '@angular/core/testing';

import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('requestLocation(onSuccess, onError)', () => {
    it('should call requestLocation()', () => {
      const onSuccess = () => 'Success';
      const onError = () => 'Error';

      spyOn(service, 'requestLocation');
      service.requestLocation(onSuccess, onError);

      expect(service.requestLocation).toHaveBeenCalled();
      expect(service.requestLocation).toHaveBeenCalledWith(onSuccess, onError);
    });

    it('should execute the onSuccess function with valid data', () => {
      const spySuccess = jasmine.createSpy();
      const spyError = jasmine.createSpy();

      let position: any;

      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((onSuccess, onError) => {
          position = { coords: { latitude: 32.8569, longitude: -96.9628 } };

          if (position.coords) {
            onSuccess(position);
          } else {
            onError(position);
          }
        }
      );

      service.requestLocation(spySuccess, spyError);
      expect(spySuccess).toHaveBeenCalled();
      expect(spyError).not.toHaveBeenCalled();
      expect(spySuccess).toHaveBeenCalledOnceWith(position.coords);
    });

    it('should execute the onError function with valid data', () => {
      const spySuccess = jasmine.createSpy();
      const spyError = jasmine.createSpy();

      let position: any;

      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((onSuccess, onError) => {
          position = { };

          if (position.coords) {
            onSuccess(position);
          } else {
            onError(position);
          }
        }
      );

      service.requestLocation(spySuccess, spyError);
      expect(spyError).toHaveBeenCalled();
      expect(spySuccess).not.toHaveBeenCalled();
    });
  });


  describe('getUnformattedMapUrlFrom(location)', () => {
    it('should return coordinates URL if if such are provided as parameter', () => {
      const coordinates = { latitude: 32.8569, longitude: -96.9628 } as CafeLocation;
      const url = service.getUnformattedMapUrlFrom(coordinates);

      expect(url).toBe('32.8569,-96.9628');
    });

    it('should return address & city URL if such are provided as parameter', () => {
      const addressAndCity = { address: 'Puppet Street', city: 'New York' } as CafeLocation;
      const url = service.getUnformattedMapUrlFrom(addressAndCity);

      expect(url).toBe('Puppet Street, New York');
    });

    it('should return null URL if no coordinates/address&city are provided as parameter', () => {
      const emptyObject = { } as CafeLocation;
      const url = service.getUnformattedMapUrlFrom(emptyObject);

      expect(url).toBe(null);
    });
  });

  describe('getFormattedMapUrlFrom(location)', () => {
    const coordinates = { latitude: 32.8569, longitude: -96.9628 } as CafeLocation;

    it('should maps.google URL if userAgent == google', () => {
      Object.defineProperty(window.navigator, 'userAgent', { value: 'Google', configurable: true });

      const formattedUrl = service.getFormattedMapUrlFrom(coordinates);
      expect(formattedUrl).toBe(`https://maps.google.com/?q=${coordinates.latitude},${coordinates.longitude}`);
    });

    it('should maps.apple URL if userAgent == apple', () => {
      Object.defineProperty(window.navigator, 'userAgent', { value: 'iPad', configurable: true });

      const formattedUrl = service.getFormattedMapUrlFrom(coordinates);
      expect(formattedUrl).toBe(`https://maps.apple.com/?q=${coordinates.latitude},${coordinates.longitude}`);
    });
  });

  describe('getMapUrlFrom(location)', () => {
    it('should return coordinates URL if if such are provided as parameter', () => {
      const coordinates = { latitude: 32.8569, longitude: -96.9628 } as CafeLocation;
      const url = service.getUnformattedMapUrlFrom(coordinates);

      expect(url).toBe('32.8569,-96.9628');
    });

    it('should return address & city URL if such are provided as parameter', () => {
      const addressAndCity = { address: 'Puppet Street', city: 'New York' } as CafeLocation;
      const url = service.getUnformattedMapUrlFrom(addressAndCity);

      expect(url).toBe('Puppet Street, New York');
    });

    it('should return null URL if no coordinates/address&city are provided as parameter', () => {
      const emptyObject = { } as CafeLocation;
      const url = service.getUnformattedMapUrlFrom(emptyObject);

      expect(url).toBe(null);
    });
  });

});
