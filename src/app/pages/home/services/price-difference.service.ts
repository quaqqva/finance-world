import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Store } from '@ngxs/store';
import { Subscription, filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CurrencyChartStateModel } from '../../../redux/states/currency-chart/currency-chart-state.model';
import { CurrenciesWsService } from './currencies-ws.service';

@Injectable({
  providedIn: 'root',
})
@UntilDestroy()
export class PriceDifferenceService {
  public lastCurrencyPrice: number = 0;

  private wsSubscription: Subscription | null = null;

  public constructor(
    private messageService: MessageService,
    currenciesWsService: CurrenciesWsService,
    store: Store,
  ) {
    store
      .select((state) => state.currencyChart)
      .pipe(
        untilDestroyed(this),
        filter((state) => !!state.currency),
      )
      .subscribe((state: CurrencyChartStateModel) => {
        if (this.wsSubscription) {
          this.wsSubscription.unsubscribe();
          this.wsSubscription = null;
        }
        if (!state.isWsEnabled) return;

        this.wsSubscription = currenciesWsService
          .observeTrades(state.currency, state.relativeCurrency)
          .pipe(untilDestroyed(this))
          .subscribe((trade) => {
            if (this.lastCurrencyPrice !== trade.price) {
              this.messageService.add({
                severity: 'info',
                summary: `Стоимость валюты изменилась с ${this.lastCurrencyPrice} до ${trade.price} ${state.relativeCurrency}!`,
              });
              this.lastCurrencyPrice = trade.price;
            }
          });
      });
  }
}
