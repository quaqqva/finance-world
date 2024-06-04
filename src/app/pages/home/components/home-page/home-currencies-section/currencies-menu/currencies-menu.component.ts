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
import { CurrenciesHttpService } from '../../../../services/currencies-http.service';
import { getCurrencyIconUrl } from '../../../../utils/get-currency-icon-url';

@Component({
  selector: 'app-currencies-menu',
  templateUrl: './currencies-menu.component.html',
  styleUrl: './currencies-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesMenuComponent {
  @Output() public selectedCurrencyChange = new EventEmitter<string>();

  @ViewChild('tabMenu') private tabMenu!: TabMenu;

  public constructor(private currenciesHttpService: CurrenciesHttpService) {}

  public currenciesMenuItems$: Observable<MenuItem[]> =
    this.currenciesHttpService.getCurrencies().pipe(
      map((currencies) =>
        currencies.map((currency) => ({
          label: currency,
          icon: getCurrencyIconUrl(currency),
        })),
      ),
      tap((currencies) => {
        [this.tabMenu.activeItem] = currencies;
      }),
    );

  public onCurrencyChange(item: MenuItem): void {
    this.selectedCurrencyChange.emit(item.label);
  }
}
