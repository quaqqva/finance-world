export type CurrenciesOrdersResponse = {
  [pair: string]: CurrencyOrderResponse;
};

export type CurrencyOrderResponse = {
  ask_quantity: string;
  ask_amount: string;
  ask_top: string;
  bid_quantity: string;
  bid_amount: string;
  bid_top: string;
  ask: [string, string, string][];
  bid: [string, string, string][];
};
