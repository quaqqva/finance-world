import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Observable, map, tap } from 'rxjs';
import { formatDate } from '@angular/common';
import { CurrencyTrade } from '../../../../models/currency-trade.model';
import { CurrenciesService } from '../../../../services/currencies.service';
import RelativeCurrency from '../../../../enums/relative-currencies';

@Component({
  selector: 'app-currencies-chart',
  templateUrl: './currencies-chart.component.html',
  styleUrl: './currencies-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesChartComponent implements OnChanges {
  @Input({ required: true }) public currency!: string;

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

  public ngOnChanges(): void {
    this.currencyTradesChartData$ = this.currenciesService
      .getTradesForCurrency(this.currency, RelativeCurrency.USDT)
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
