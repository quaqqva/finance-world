import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { TabMenu } from 'primeng/tabmenu';
import { Store } from '@ngxs/store';
import { CurrenciesHttpService } from '../../../../services/currencies-http.service';
import { getCurrencyIconUrl } from '../../../../utils/get-currency-icon-url';
import { ChangeCurrency } from '../../../../../../redux/actions/currency-chart/change-currency.action';

@Component({
  selector: 'app-currencies-menu',
  templateUrl: './currencies-menu.component.html',
  styleUrl: './currencies-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesMenuComponent {
  @ViewChild('tabMenu') private tabMenu!: TabMenu;

  public constructor(
    private currenciesHttpService: CurrenciesHttpService,
    private store: Store,
  ) {}

  public currenciesMenuItems$: Observable<MenuItem[]> =
    this.currenciesHttpService.getCurrencies().pipe(
      map((currencies) =>
        currencies.map((currency) => ({
          label: currency,
          icon: getCurrencyIconUrl(currency),
          command: () => this.store.dispatch(new ChangeCurrency(currency)),
        })),
      ),
      tap((currencies) => {
        [this.tabMenu.activeItem] = currencies;
        this.store.dispatch(new ChangeCurrency(currencies[0].label));
      }),
    );
}
