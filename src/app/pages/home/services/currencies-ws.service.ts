import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable, filter, finalize, map } from 'rxjs';
import WebsocketUtilityInfo from '../models/ws/ws-utility-info.model';
import WebsocketResponse from '../models/ws/ws-response.model';
import RelativeCurrency from '../models/relative-currencies.enum';
import { CurrencyTrade } from '../models/currency-trade.model';
import { CurrencyTradeResponse } from '../models/currency-trades-response.model';
import { tradeReponseToModel } from '../utils/trades-response-to-model';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesWsService {
  private static URL: string = 'wss://ws-api.exmo.me:443/v1/public';

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
    if (!this.subscriptions[topic]) {
      this.subscriptions[topic] = this.connectToTopic(
        topicFullName,
      ) as Observable<T>;
    }
    return this.subscriptions[topic].pipe(
      finalize<unknown>(() => {
        delete this.subscriptions[topic];
        this.disconnectFromTopic(topicFullName);
      }),
    ) as Observable<T>;
  }

  private connectToTopic<T>(topic: string): Observable<T> {
    if (!this.subject) this.subject = webSocket(CurrenciesWsService.URL);
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
    if (Object.keys(this.subscriptions).length === 1) {
      this.subject?.complete();
      this.subject = undefined;
    } else {
      const utilityData: WebsocketUtilityInfo = {
        method: 'unsubscribe',
        topics: [topic],
      };
      this.subject?.next(utilityData);
    }
  }
}