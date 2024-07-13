import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RelativeCurrency } from '../../../../models/relative-currencies.enum';
import { getCurrencyIconUrl } from '../../../../utils/get-currency-icon-url';
import { WsToggle } from '../../../../../../redux/actions/currency-chart/toggle-ws-action';
import { ChangeRelativeCurrency } from '../../../../../../redux/actions/currency-chart/change-relative-currency.action';

@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrl: './chart-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartSettingsComponent {
  public isWsEnabled$: Observable<boolean>;

  public selectOptions: MenuItem[] = Object.values(RelativeCurrency).map(
    (currency) => {
      return {
        label: currency,
        icon: getCurrencyIconUrl(currency),
      };
    },
  );

  public constructor(private store: Store) {
    this.isWsEnabled$ = this.store.selectOnce(
      (state) => state.currencyChart.isWsEnabled,
    );
  }

  public onWsToggle(): void {
    this.store.dispatch(new WsToggle());
  }

  public onRelativeCurrencyChange(relativeCurrency: RelativeCurrency): void {
    this.store.dispatch(new ChangeRelativeCurrency(relativeCurrency));
  }
}
