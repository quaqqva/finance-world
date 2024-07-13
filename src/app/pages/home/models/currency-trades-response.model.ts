export type CurrencyTradesResponse = {
  [pair: string]: CurrencyTradeResponse[];
};

export type CurrencyTradeResponse = {
  trade_id: number;
  date: number;
  type: 'buy' | 'sell';
  quantity: string;
  price: string;
  amount: string;
};
