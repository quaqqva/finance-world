import { Pipe, PipeTransform } from '@angular/core';
import { ChartData } from 'chart.js';
import { CurrencyTrade } from '../models/currency-trade.model';

@Pipe({
  name: 'tradesToChartData',
})
export class TradesToChartDataPipe implements PipeTransform {
  transform(trades: CurrencyTrade[] | null): ChartData | null {
    if (!trades) return null;
    return {
      datasets: [
        {
          data: trades.map((trade) => {
            return { x: trade.date.getTime(), y: trade.price };
          }),
        },
      ],
    };
  }
}
