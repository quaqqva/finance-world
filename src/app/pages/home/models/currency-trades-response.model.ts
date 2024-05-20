type CurrencyTradesResponse = {
  [pair: string]: {
    trade_id: number;
    date: number;
    type: 'buy' | 'sell';
    quantity: string;
    price: string;
    amount: string;
  }[];
};

export default CurrencyTradesResponse;
