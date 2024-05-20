import CurrenciesOrdersResponse from '../home/models/currencies-orders-response.model';
import { CurrenciesOrders } from '../home/models/currency-orders.model';

export default function ordersResponseToModel(
  ordersResponse: CurrenciesOrdersResponse,
): CurrenciesOrders {
  return Object.fromEntries(
    Object.entries(ordersResponse).map((entry) => {
      const [pair, orderResponse] = entry;
      const order = {
        askTotals: {
          quantity: Number(orderResponse.ask_quantity),
          amount: Number(orderResponse.ask_amount),
          top: Number(orderResponse.ask_top),
        },
        bidTotals: {
          quantity: Number(orderResponse.bid_quantity),
          amount: Number(orderResponse.bid_amount),
          top: Number(orderResponse.bid_top),
        },
        asks: orderResponse.ask.map((ask) => ({
          price: Number(ask[0]),
          quantity: Number(ask[1]),
          total: Number(ask[2]),
        })),
        bids: orderResponse.bid.map((bid) => ({
          price: Number(bid[0]),
          quantity: Number(bid[1]),
          total: Number(bid[2]),
        })),
      };

      return [pair, order];
    }),
  );
}
