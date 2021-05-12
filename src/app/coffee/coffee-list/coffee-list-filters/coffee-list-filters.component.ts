import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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

  public showFilters: boolean = false;

  // Search/filter
  public search = '';

  // Sorting
  public sortByOptions: KeyValue<any, CoffeeSortByEnum>[] = this._enumToKeyValue(CoffeeSortByEnum);

  // Direction
  public sortDirectionOptions: KeyValue<any, SortDirectionEnum>[] = this._enumToKeyValue(SortDirectionEnum);

  // Layout
  public layoutOptions: KeyValue<any, ListLayoutEnum>[] = this._enumToKeyValue(ListLayoutEnum);

  @Output() searchUpdate: EventEmitter<string> = new EventEmitter();
  @Output() filtersUpdate: EventEmitter<CoffeeListFilters> = new EventEmitter();
  @Output() layoutUpdate: EventEmitter<ListLayoutEnum> = new EventEmitter();

  constructor() { }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // Listen to changes for the @Inputs to prevent
    // children directly changing the state of the parent
    if (changes.filters) {
      this.filters = Object.assign({}, changes.filters.currentValue);
    }
    if (changes.listLayout) {
      this.listLayout = changes.listLayout.currentValue;
    }
  }

  public onSearch(): void {
    this.filters.search = this.search;
    this.filtersUpdate.emit(this.filters);
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

  private _enumToKeyValue(enumerable: any): KeyValue<any, any>[] {
    return Object.keys(enumerable).map(el =>
      ({ key: el, value: enumerable[el] })
    );
  }


}
