import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { ChartData } from 'chart.js';
import { CurrenciesService } from '../../../services/currencies.service';
import RelativeCurrency from '../../../enums/relative-currencies';

@Component({
  selector: 'app-home-currencies-section',
  templateUrl: './home-currencies-section.component.html',
  styleUrl: './home-currencies-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCurrenciesSectionComponent {
  public currenciesMenuItems$: Observable<MenuItem[]> = this.currenciesService
    .getCurrencies()
    .pipe(
      map((currencies: string[]): MenuItem[] => {
        return currencies.map((currency) => {
          return { label: currency };
        });
      }),
    );

  public constructor(private currenciesService: CurrenciesService) {}

  public currentCurrencyTrades$?: Observable<ChartData>;

  public onCurrencyChange(currencyItem: MenuItem): void {
    this.currentCurrencyTrades$ = this.currenciesService
      .getTradesForCurrency(currencyItem.label!, RelativeCurrency.USDT)
      .pipe(
        map((trades) => {
          return {
            labels: trades.map((trade) => trade.date.toUTCString()),
            datasets: [
              {
                data: trades.map((trade) => trade.price),
              },
            ],
          };
        }),
      );
  }
}
