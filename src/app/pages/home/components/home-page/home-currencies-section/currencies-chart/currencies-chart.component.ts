import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
} from '@angular/core';
import {
  CartesianScaleTypeRegistry,
  ChartOptions,
  ScaleOptionsByType,
} from 'chart.js';
import { Subscription, take, tap } from 'rxjs';
import { formatDate } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { CurrencyTrade } from '../../../../models/currency-trade.model';
import { CurrenciesHttpService } from '../../../../services/currencies-http.service';
import RelativeCurrency from '../../../../models/relative-currencies.enum';
import { CurrenciesWsService } from '../../../../services/currencies-ws.service';

@Component({
  selector: 'app-currencies-chart',
  templateUrl: './currencies-chart.component.html',
  styleUrl: './currencies-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class CurrenciesChartComponent implements OnChanges {
  @Input({ required: true }) public currency?: string;

  @Input({ required: true }) public relativeCurrency?: RelativeCurrency;

  public currencyTrades: CurrencyTrade[] | null = null;

  private wsSubscription?: Subscription;

  private static GetScalesOptions(): _DeepPartialObject<{
    [key: string]: ScaleOptionsByType<
      'radialLinear' | keyof CartesianScaleTypeRegistry
    >;
  }> {
    const shouldTitleDisplay = window.innerWidth > 600;

    return {
      x: {
        type: 'time',
        title: {
          display: shouldTitleDisplay,
          text: 'Время',
        },
        time: {
          displayFormats: {
            hour: 'HH:mm',
            minute: 'HH:mm',
            second: 'HH:mm:ss',
            day: 'dd MM',
          },
        },
      },
      y: {
        title: {
          display: shouldTitleDisplay,
          text: 'Относительная стоимость',
        },
      },
    };
  }

  public chartOptions: ChartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (context) =>
            context.map((item) => {
              if (!this.currencyTrades) return '';
              const trade = this.currencyTrades[item.dataIndex];
              return `№${trade.id.toString()}`;
            }),
          label: (context) => {
            if (!this.currencyTrades) return [];
            const trade = this.currencyTrades[context.dataIndex];
            return [
              `Дата: ${formatDate(trade?.date, 'dd.MM.yyyy HH:mm:ss', this.locale)}`,
              `Цена: ${trade?.price}`,
            ];
          },
        },
      },
    },
    scales: CurrenciesChartComponent.GetScalesOptions(),
  };

  public constructor(
    private currenciesHttpService: CurrenciesHttpService,
    private currenciesWsService: CurrenciesWsService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(LOCALE_ID) private locale: string,
  ) {}

  public ngOnChanges(): void {
    if (!this.currency || !this.relativeCurrency) return;
    if (this.wsSubscription) this.wsSubscription.unsubscribe();
    this.currencyTrades = null;

    this.chartOptions.animation = undefined;

    this.currenciesHttpService
      .getTradesForCurrency(this.currency, this.relativeCurrency)
      .pipe(
        take(1),
        tap((trades) => {
          this.currencyTrades = trades;
          this.changeDetectorRef.detectChanges();

          this.chartOptions.animation = {
            duration: 0,
          };

          this.wsSubscription = this.currenciesWsService
            .observeTrades(this.currency!, this.relativeCurrency!)
            .pipe(untilDestroyed(this))
            .subscribe((trade) => {
              this.currencyTrades = [...this.currencyTrades!.slice(1), trade];
              this.changeDetectorRef.detectChanges();
            });
        }),
      )
      .subscribe();
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.chartOptions = {
      ...this.chartOptions,
      scales: CurrenciesChartComponent.GetScalesOptions(),
    };
  }
}
