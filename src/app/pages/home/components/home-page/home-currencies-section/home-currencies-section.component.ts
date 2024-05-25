import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  LOCALE_ID,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, map, tap } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { formatDate } from '@angular/common';
import { eu } from 'date-fns/locale';
import { CurrenciesService } from '../../../services/currencies.service';
import RelativeCurrency from '../../../enums/relative-currencies';
import { CurrencyTrade } from '../../../models/currency-trade.model';
import CurrencyInfo from '../../../models/currency-info.model';
import 'chartjs-adapter-date-fns';

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
      map((currencies: CurrencyInfo[]): MenuItem[] =>
        currencies.map((currency) => {
          return { label: currency.name, icon: currency.imageUrl };
        }),
      ),
    );

  public currencyTradesChartData$?: Observable<ChartData>;

  private currentCurrencyTrades?: CurrencyTrade[] = undefined;

  public chartOptions: ChartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (context) =>
            context.map((item) => {
              if (!this.currentCurrencyTrades) return '';
              const trade = this.currentCurrencyTrades[item.dataIndex];
              return `№${trade.id.toString()}`;
            }),
          label: (context) => {
            if (!this.currentCurrencyTrades) return [];
            const trade = this.currentCurrencyTrades[context.dataIndex];
            return [
              `Дата: ${formatDate(trade?.date, 'dd.MM.yyyy HH:mm:ss', this.locale)}`,
              `Цена: ${trade?.price}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Время',
        },
        adapters: {
          date: {
            locale: eu,
          },
        },
        time: {
          displayFormats: {
            hour: 'HH:mm',
            minute: 'HH:mm',
            day: 'dd MM',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Относительная стоимость',
        },
      },
    },
  };

  public constructor(
    private currenciesService: CurrenciesService,
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  public onCurrencyChange(currencyItem: MenuItem): void {
    if (!currencyItem) return;
    this.currencyTradesChartData$ = this.currenciesService
      .getTradesForCurrency(currencyItem.label!, RelativeCurrency.USDT)
      .pipe(
        tap((trades) => {
          this.currentCurrencyTrades = trades;
        }),
        map((trades) => {
          return {
            datasets: [
              {
                data: trades.map((trade) => {
                  return { x: trade.date.getTime(), y: trade.price };
                }),
              },
            ],
          };
        }),
      );
  }
}
