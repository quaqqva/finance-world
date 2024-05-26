import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesWsService {
  // 1. Подключение к wss://ws-api.exmo.me:443/v1/public
  // 2. Отправка { "method":"subscribe","topics":["spot/trades:*ПАРА*"] }
  // 3. Прилетает жсон вида
  // "ts": 1716725362369,
  // "event": "update",
  // "topic": "spot/trades:BTC_USDT",
  //  data: [
  //       {
  //         "trade_id": 629285394,
  //         "type": "sell",
  //         "price": "69113.85",
  //         "quantity": "0.0017",
  //         "amount": "117.493545",
  //         "date": 1716725362
  //     }
  // ]
  // 4. Отписка на method: unsubscribe
}
