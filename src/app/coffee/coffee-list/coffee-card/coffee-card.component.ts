import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from 'src/app/core/services';
import { ICoffee } from '../../interfaces';
import { Coffee } from '../../models';
import { ListLayoutEnum } from './../../../core/enums/list-layout.enum';

@Component({
  selector: 'mca-coffee-card',
  templateUrl: './coffee-card.component.html',
  styleUrls: ['./coffee-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoffeeCardComponent implements OnInit {
  @Input() coffee: Coffee;
  @Input() listLayout: ListLayoutEnum;

  @Output() share: EventEmitter<Coffee> = new EventEmitter();
  @Output() viewDetails: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit(): void {
  }

  public viewOnMap(coffee: ICoffee): void {
    const mapURL = this.geolocationService.getFormattedMapUrlFrom(coffee.cafeLocation);
    location.href = mapURL;
  }

  public shareCoffee(coffee: Coffee): void {
    const shareCoffeeText = `I had this coffee at ${coffee.cafeName} and for me it's a ${coffee.rating}.`;

    if ('share' in navigator) {
      navigator.share({
        title: coffee.name,
        text: shareCoffeeText,
        url: window.location.href
      })
        .then(() => console.log('Coffee shared'))
        .catch((error) => { throw new Error(`Coffee share Error: ${error}`); });
    } else {
      const shareCoffeeURL = `whatsapp://send?text=${encodeURIComponent(shareCoffeeText)}`;
      location.href = shareCoffeeURL;
    }
  }

  public viewCoffeeDetails(coffeeId: string): void {
    this.router.navigate(['coffees', coffeeId]);
  }

}
