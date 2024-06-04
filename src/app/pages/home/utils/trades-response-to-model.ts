import {
  CurrencyTradesResponse,
  CurrencyTradeResponse,
} from '../models/currency-trades-response.model';
import { CurrencyTrade, CurrencyTrades } from '../models/currency-trade.model';

export function tradeReponseToModel(
  tradeResponse: CurrencyTradeResponse,
): CurrencyTrade {
  return {
    id: tradeResponse.trade_id,
    date: new Date(tradeResponse.date * 1000),
    type: tradeResponse.type,
    quantity: Number(tradeResponse.quantity),
    price: Number(tradeResponse.price),
    amount: Number(tradeResponse.amount),
  };
}

export function tradesResponseToModel(
  tradesResponse: CurrencyTradesResponse,
): CurrencyTrades {
  return Object.fromEntries(
    Object.entries(tradesResponse).map((entry) => {
      const [key, incomingTrades] = entry;
      const trades: CurrencyTrade[] = incomingTrades.map(tradeReponseToModel);
      return [key, trades];
    }),
  );
}
