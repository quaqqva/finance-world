import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { CurrencyChartStateModel } from './currency-chart-state.model';
import { RelativeCurrency } from '../../../pages/home/models/relative-currencies.enum';
import { ChangeCurrency } from '../../actions/currency-chart/change-currency.action';
import { ChangeRelativeCurrency } from '../../actions/currency-chart/change-relative-currency.action';
import { WsToggle } from '../../actions/currency-chart/toggle-ws-action';

@State<CurrencyChartStateModel>({
  name: 'currencyChart',
  defaults: {
    currency: '',
    relativeCurrency: RelativeCurrency.USDT,
    isWsEnabled: true,
  },
})
@Injectable()
export class CurrencyChartState {
  @Action(ChangeCurrency)
  public changeCurrency(
    ctx: StateContext<CurrencyChartStateModel>,
    action: ChangeCurrency,
  ): void {
    ctx.patchState({
      currency: action.currency,
    });
  }

  @Action(ChangeRelativeCurrency)
  public changeRelativeCurrency(
    ctx: StateContext<CurrencyChartStateModel>,
    action: ChangeRelativeCurrency,
  ): void {
    ctx.patchState({
      relativeCurrency: action.relativeCurrency,
    });
  }

  @Action(WsToggle)
  public toggleWebSocket(ctx: StateContext<CurrencyChartStateModel>): void {
    ctx.patchState({
      isWsEnabled: !ctx.getState().isWsEnabled,
    });
  }
}
