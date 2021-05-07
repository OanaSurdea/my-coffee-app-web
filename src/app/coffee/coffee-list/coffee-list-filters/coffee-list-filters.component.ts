import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ListLayoutEnum, SortDirectionEnum } from 'src/app/core/enums';
import { CoffeeSortByEnum } from '../../enums';
import { CoffeeListFilters } from '../../models/coffee-list-filters';

@Component({
  selector: 'mca-coffee-list-filters',
  templateUrl: './coffee-list-filters.component.html',
  styleUrls: ['./coffee-list-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoffeeListFiltersComponent implements OnInit, OnChanges {

  @Input() filters: CoffeeListFilters;
  @Input() listLayout: ListLayoutEnum;

  showFilters: boolean = false;

  // Sorting
  sortByOptions: KeyValue<any, CoffeeSortByEnum>[] = this.enumToKeyValue(CoffeeSortByEnum);

  // Direction
  sortDirectionOptions: KeyValue<any, SortDirectionEnum>[] = this.enumToKeyValue(SortDirectionEnum);

  // Layout
  layoutOptions: KeyValue<any, ListLayoutEnum>[] = this.enumToKeyValue(ListLayoutEnum);

  @Output() filtersUpdate: EventEmitter<CoffeeListFilters> = new EventEmitter();
  @Output() layoutUpdate: EventEmitter<ListLayoutEnum> = new EventEmitter();

  sortByForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.sortByForm = new FormGroup({
      sortBy: new FormControl(this.filters.sortBy)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Listen to changes for the @Inputs to prevent
    // children directly changing the state of the parent
    if (changes.filters) {
      this.filters = Object.assign({}, changes.filters.currentValue);
    }
    if (changes.listLayout) {
      this.listLayout = changes.listLayout.currentValue;
    }
  }

  public toggleShowFilters(): void {
    this.showFilters = !this.showFilters;
  }

  public onSortBy(sortByOption: CoffeeSortByEnum): void {
    console.log(sortByOption);

    this.filters.sortBy = sortByOption;
    this.filtersUpdate.emit(this.filters);
  }

  public onSortDirection(sortDirectionOption: SortDirectionEnum): void {
    console.log(sortDirectionOption);


    this.filters.sortDirection = sortDirectionOption;
    this.filtersUpdate.emit(this.filters);
  }

  public onLayout(layoutOption: ListLayoutEnum): void {
    this.listLayout = layoutOption as ListLayoutEnum;
    this.layoutUpdate.emit(this.listLayout);
  }

  enumToKeyValue(enumerable: any): KeyValue<any, any>[] {
    return Object.keys(enumerable).map(el =>
      ({ key: el, value: enumerable[el] })
    );
  }


}
