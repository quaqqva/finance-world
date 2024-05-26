import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { MessageService } from 'primeng/api';
import Endpoints from '../../../shared/enums/endpoints';
import RelativeCurrency from '../enums/relative-currencies';
import isStringInEnum from '../../../shared/utils/is-string-in-enum';
import CurrenciesOrdersResponse from '../models/currencies-orders-response.model';
import { CurrencyOrders } from '../models/currency-orders.model';
import tradesResponseToModel from '../utils/trades-response-to-model';
import ordersResponseToModel from '../utils/orders-response-to-model';
import CurrencyTradeResponse from '../models/currency-trades-response.model';
import { CurrencyTrade } from '../models/currency-trade.model';
import CurrencyInfo from '../models/currency-info.model';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
  ) {}

  public getCurrencies(): Observable<CurrencyInfo[]> {
    return this.httpClient
      .post<string[]>(Endpoints.CurrenciesList, new URLSearchParams())
      .pipe(
        map((currencies) =>
          currencies
            .filter(
              (currency: string) => !isStringInEnum(RelativeCurrency, currency),
            )
            .map((currency) => ({
              name: currency,
              imageUrl: `https://static.exmoney.com/mobile/currency/${currency}.png`,
            })),
        ),
      );
  }

  public getTradesForCurrency(
    currency: string,
    relativeTo: RelativeCurrency,
  ): Observable<CurrencyTrade[]> {
    const pair = `${currency}_${relativeTo}`;
    return this.httpClient
      .post<CurrencyTradeResponse>(
        Endpoints.Trades,
        new URLSearchParams({
          pair,
        }),
      )
      .pipe(
        map((response) => {
          const trades = tradesResponseToModel(response);
          return trades[pair];
        }),
        map((trades) => {
          return trades.sort((a, b) => a.date.getTime() - b.date.getTime());
        }),
        catchError(() => EMPTY),
      );
  }

  public getOrdersForCurrency(
    currency: string,
    relativeTo: RelativeCurrency,
  ): Observable<CurrencyOrders> {
    const pair = `${currency}_${relativeTo}`;
    return this.httpClient
      .post<CurrenciesOrdersResponse>(Endpoints.Orders, {
        pair,
        limit: 10,
      })
      .pipe(
        map((response) => {
          const orders = ordersResponseToModel(response);
          return orders[pair];
        }),
      );
  }
}
