import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { MenuItem } from 'primeng/api';
import RelativeCurrency from '../../../../enums/relative-currencies';
import getCurrencyIconUrl from '../../../../utils/get-currency-icon-url';

@Component({
  selector: 'app-relative-currency-select',
  templateUrl: './relative-currency-select.component.html',
  styleUrl: './relative-currency-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelativeCurrencySelectComponent implements OnInit {
  @Output() private selectedCurrency = new EventEmitter<RelativeCurrency>();

  public selectOptions: MenuItem[] = Object.values(RelativeCurrency).map(
    (currency) => {
      return {
        label: currency,
        icon: getCurrencyIconUrl(currency),
      };
    },
  );

  public ngOnInit(): void {
    this.selectedCurrency.emit(RelativeCurrency.USDT);
  }

  public onValueChange(event: DropdownChangeEvent): void {
    this.selectedCurrency.emit(event.value.label);
  }
}
