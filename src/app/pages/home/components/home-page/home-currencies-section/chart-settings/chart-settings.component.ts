import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import RelativeCurrency from '../../../../models/relative-currencies.enum';
import getCurrencyIconUrl from '../../../../utils/get-currency-icon-url';

@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrl: './chart-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartSettingsComponent implements OnInit {
  public selectedRelativeCurrency: RelativeCurrency = RelativeCurrency.USDT;

  @Output() public selectedRelativeCurrencyChange =
    new EventEmitter<RelativeCurrency>();

  public isWsEnabled: boolean = true;

  @Output() public isWsEnabledChange = new EventEmitter<boolean>();

  public selectOptions: MenuItem[] = Object.values(RelativeCurrency).map(
    (currency) => {
      return {
        label: currency,
        icon: getCurrencyIconUrl(currency),
      };
    },
  );

  public ngOnInit(): void {
    this.sendRelativeCurrency();
    this.sendIsWsEnabled();
  }

  public sendIsWsEnabled(): void {
    this.isWsEnabledChange.emit(this.isWsEnabled);
  }

  public sendRelativeCurrency(): void {
    this.selectedRelativeCurrencyChange.emit(this.selectedRelativeCurrency);
  }
}
