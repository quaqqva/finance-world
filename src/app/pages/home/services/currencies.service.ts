import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import Endpoints from '../../../shared/enums/endpoints';
import RelativeCurrency from '../enums/relative-currencies';
import isStringInEnum from '../../../shared/utils/is-string-in-enum';
import CurrenciesOrdersResponse from '../models/currencies-orders-response.model';
import { CurrencyOrders } from '../models/currency-orders.model';
import tradesResponseToModel from '../../utils/trades-response-to-model';
import ordersResponseToModel from '../../utils/orders-response-to-model';
import CurrencyTradeResponse from '../models/currency-trades-response.model';
import { CurrencyTrade } from '../models/currency-trade.model';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  public static RELATIVE_CURRENCIES = ['USDT', 'USDX', 'RUB', 'KZT'];

  constructor(private httpClient: HttpClient) {}

  public getCurrencies(): Observable<string[]> {
    return this.httpClient
      .post<string[]>(Endpoints.CurrenciesList, new URLSearchParams())
      .pipe(
        map((currencies) =>
          currencies.filter(
            (currency: string) => !isStringInEnum(RelativeCurrency, currency),
          ),
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
