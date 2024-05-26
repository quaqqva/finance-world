import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Observable, map, tap } from 'rxjs';
import { formatDate } from '@angular/common';
import { UIChart } from 'primeng/chart';
import { CurrencyTrade } from '../../../../models/currency-trade.model';
import { CurrenciesHttpService } from '../../../../services/currencies-http.service';
import RelativeCurrency from '../../../../enums/relative-currencies';

@Component({
  selector: 'app-currencies-chart',
  templateUrl: './currencies-chart.component.html',
  styleUrl: './currencies-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesChartComponent implements OnChanges {
  @Input({ required: true }) public currency!: string;

  @Input({ required: true }) public relativeCurrency!: RelativeCurrency;

  @ViewChild('chart') public chart!: UIChart;

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
          display: window.innerWidth > 600,
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
          display: window.innerWidth > 600,
          text: 'Относительная стоимость',
        },
      },
    },
  };

  public constructor(
    private currenciesHttpService: CurrenciesHttpService,
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  public ngOnChanges(): void {
    this.currencyTradesChartData$ = this.currenciesHttpService
      .getTradesForCurrency(this.currency, this.relativeCurrency)
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

  @HostListener('window:resize')
  public onResize(): void {
    Object.values(this.chartOptions.scales!).forEach((axis) => {
      // У chart.js что-то не так со встроенной типизацией, он считает, что свойства title у осей нет
      const axisTitle = (axis! as { title: { display: boolean } }).title;
      axisTitle.display = window.innerWidth > 600;
    });
    this.chart.reinit();
  }
}
