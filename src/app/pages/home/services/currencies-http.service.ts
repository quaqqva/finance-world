import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { Endpoints } from '../../../shared/enums/endpoints';
import { RelativeCurrency } from '../models/relative-currencies.enum';
import { isStringInEnum } from '../../../shared/utils/is-string-in-enum';
import { CurrencyTrade } from '../models/currency-trade.model';
import { CurrencyTradesResponse } from '../models/currency-trades-response.model';
import { tradesResponseToModel } from '../utils/trades-response-to-model';
import { PriceDifferenceService } from './price-difference.service';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesHttpService {
  constructor(
    private httpClient: HttpClient,
    private priceDifferenceService: PriceDifferenceService,
  ) {}

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
      .post<CurrencyTradesResponse>(
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
        tap((trades) => {
          this.priceDifferenceService.lastCurrencyPrice =
            trades[trades.length - 1].price;
        }),
        catchError(() => EMPTY),
      );
  }
}
