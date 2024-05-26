import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { TabMenu } from 'primeng/tabmenu';
import { CurrenciesService } from '../../../../services/currencies.service';

@Component({
  selector: 'app-currencies-menu',
  templateUrl: './currencies-menu.component.html',
  styleUrl: './currencies-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesMenuComponent {
  @Output() private selectedCurrency: EventEmitter<string> = new EventEmitter();

  @ViewChild('tabMenu') private tabMenu!: TabMenu;

  public constructor(private currenciesService: CurrenciesService) {}

  public currenciesMenuItems$: Observable<MenuItem[]> = this.currenciesService
    .getCurrencies()
    .pipe(
      map((currencies) => {
        return currencies.map((currency): MenuItem => {
          return {
            label: currency.name,
            icon: currency.imageUrl,
          };
        });
      }),
      tap((currencies) => {
        [this.tabMenu.activeItem] = currencies;
      }),
    );

  public onCurrencyChange(item: MenuItem): void {
    this.selectedCurrency.emit(item.label);
  }
}