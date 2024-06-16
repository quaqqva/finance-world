import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import {
  CartesianScaleTypeRegistry,
  ChartOptions,
  ScaleOptionsByType,
} from 'chart.js';
import { Subscription, filter, take } from 'rxjs';
import { formatDate } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Store } from '@ngxs/store';
import { CurrencyTrade } from '../../../../models/currency-trade.model';
import { CurrenciesHttpService } from '../../../../services/currencies-http.service';
import { RelativeCurrency } from '../../../../models/relative-currencies.enum';
import { CurrenciesWsService } from '../../../../services/currencies-ws.service';
import 'chartjs-adapter-date-fns';
import { CurrencyChartStateModel } from '../../../../../../redux/states/currency-chart/currency-chart-state.model';

@UntilDestroy()
@Component({
  selector: 'app-currencies-chart',
  templateUrl: './currencies-chart.component.html',
  styleUrl: './currencies-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrenciesChartComponent implements OnInit {
  public isLoading: boolean = false;

  public currencyTrades: CurrencyTrade[] | null = null;

  private currency!: string;

  private relativeCurrency!: RelativeCurrency;

  private isWsEnabled!: boolean;

  private wsSubscription: Subscription | null = null;

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
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.store
      .select((state) => state.currencyChart)
      .pipe(
        untilDestroyed(this),
        filter((state) => !!state.currency),
      )
      .subscribe((state: CurrencyChartStateModel) => {
        const hasOnlyWsChanged =
          state.isWsEnabled !== this.isWsEnabled &&
          state.currency === this.currency &&
          state.relativeCurrency === this.relativeCurrency;

        this.currency = state.currency;
        this.relativeCurrency = state.relativeCurrency;
        this.isWsEnabled = state.isWsEnabled;

        this.onSettingsChange(hasOnlyWsChanged);
      });
  }

  private onSettingsChange(hasOnlyWsChanged: boolean): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
      this.wsSubscription = null;
    }
    if (hasOnlyWsChanged) {
      if (this.isWsEnabled) this.initializeWsSubscription();
      return;
    }

    this.currencyTrades = null;

    this.chartOptions.animation = undefined;

    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    this.currenciesHttpService
      .getTradesForCurrency(this.currency, this.relativeCurrency)
      .pipe(take(1))
      .subscribe((trades) => {
        this.currencyTrades = trades;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();

        if (!this.isWsEnabled) return;

        this.chartOptions.animation = {
          duration: 0,
        };
        this.initializeWsSubscription();
      });
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.chartOptions = {
      ...this.chartOptions,
      scales: CurrenciesChartComponent.GetScalesOptions(),
    };
  }

  private initializeWsSubscription(): void {
    this.wsSubscription = this.currenciesWsService
      .observeTrades(this.currency, this.relativeCurrency)
      .pipe(untilDestroyed(this))
      .subscribe((trade) => {
        this.currencyTrades = [...this.currencyTrades!.slice(1), trade];
        this.changeDetectorRef.detectChanges();
      });
  }
}
