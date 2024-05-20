export type CurrenciesOrders = {
  [pair: string]: CurrencyOrders;
};

export type CurrencyOrders = {
  askTotals: AskBidTotals;
  bidTotals: AskBidTotals;
  asks: AskBidInfo[];
  bids: AskBidInfo[];
};

export type AskBidTotals = {
  quantity: number;
  amount: number;
  top: number;
};

export type AskBidInfo = {
  price: number;
  quantity: number;
  total: number;
};
