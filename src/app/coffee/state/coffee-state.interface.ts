import { CoffeeSortByEnum } from 'src/app/core/enums/coffee-sort-type.enum';
import { Coffee } from 'src/app/core/models/coffee.model';
import { IAppState } from 'src/app/core/state/app-state.interface';
import { SortDirectionEnum } from './../../core/enums/sort-direction.enum';

export interface ICoffeeState {
  selectedSortByOption: CoffeeSortByEnum;
  selectedSortDirectionOption: SortDirectionEnum;
  areCoffeesLoading: boolean;
  coffees$: Coffee[];
  coffeesLoadError: string;
}

export interface IState extends IAppState {
  coffees: ICoffeeState;
}
