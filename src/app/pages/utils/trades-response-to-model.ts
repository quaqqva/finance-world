import CurrencyTradesResponse from '../home/models/currency-trades-response.model';
import {
  CurrencyTrade,
  CurrencyTrades,
} from '../home/models/currency-trade.model';

export default function tradesResponseToModel(
  tradesResponse: CurrencyTradesResponse,
): CurrencyTrades {
  return Object.fromEntries(
    Object.entries(tradesResponse).map((entry) => {
      const [key, incomingTrades] = entry;
      const trades: CurrencyTrade[] = incomingTrades.map((tradeResponse) => {
        return {
          id: tradeResponse.trade_id,
          date: new Date(tradeResponse.date),
          type: tradeResponse.type,
          quantity: Number(tradeResponse.quantity),
          price: Number(tradeResponse.price),
          amount: Number(tradeResponse.amount),
        };
      });
      return [key, trades];
    }),
  );
}
