import { RelativeCurrency } from '../../../pages/home/models/relative-currencies.enum';

export type CurrencyChartStateModel = {
  currency: string;
  relativeCurrency: RelativeCurrency;
  isWsEnabled: boolean;
};
