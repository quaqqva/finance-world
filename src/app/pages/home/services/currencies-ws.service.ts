import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable, filter, finalize, map } from 'rxjs';
import { WebsocketUtilityInfo } from '../models/ws/ws-utility-info.model';
import { WebsocketResponse } from '../models/ws/ws-response.model';
import { RelativeCurrency } from '../models/relative-currencies.enum';
import { CurrencyTrade } from '../models/currency-trade.model';
import { CurrencyTradeResponse } from '../models/currency-trades-response.model';
import { tradeReponseToModel } from '../utils/trades-response-to-model';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesWsService {
  private url: string = 'wss://ws-api.exmo.me:443/v1/public';

  private subject?: WebSocketSubject<unknown>;

  private subscriptions: {
    [topic: string]: Observable<unknown>;
  } = {};

  public observeTrades(
    currency: string,
    relativeCurrency: RelativeCurrency,
  ): Observable<CurrencyTrade> {
    return this.observeTopic<CurrencyTradeResponse>(
      'trades',
      currency,
      relativeCurrency,
    ).pipe(map(tradeReponseToModel));
  }

  private observeTopic<T>(
    topic: string,
    currency: string,
    relativeCurrency: RelativeCurrency,
  ): Observable<T> {
    const topicFullName = `spot/${topic}:${currency}_${relativeCurrency}`;
    if (!this.subscriptions[topicFullName]) {
      this.subscriptions[topicFullName] = this.connectToTopic(
        topicFullName,
      ).pipe(
        finalize<unknown>(() => {
          this.disconnectFromTopic(topicFullName);
        }),
      ) as Observable<T>;
    }
    return this.subscriptions[topicFullName] as Observable<T>;
  }

  private connectToTopic<T>(topic: string): Observable<T> {
    if (!this.subject) this.subject = webSocket(this.url);
    const utilityData: WebsocketUtilityInfo = {
      method: 'subscribe',
      topics: [topic],
    };
    this.subject.next(utilityData);
    return this.subject.pipe(
      filter((response) => {
        const wsResponse = response as WebsocketResponse<unknown>;
        return wsResponse.event === 'update' && wsResponse.topic === topic;
      }),
      map((response) => (response as WebsocketResponse<T>).data[0]),
    );
  }

  private disconnectFromTopic(topic: string) {
    const utilityData: WebsocketUtilityInfo = {
      method: 'unsubscribe',
      topics: [topic],
    };
    this.subject?.next(utilityData);
    delete this.subscriptions[topic];
    if (!Object.keys(this.subscriptions).length) {
      this.subject?.complete();
      this.subject = undefined;
    }
  }
}
