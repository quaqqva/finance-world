export type CurrencyTrades = {
  [pair: string]: CurrencyTrade[];
};

export type CurrencyTrade = {
  id: number;
  date: Date;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  amount: number;
};
