import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { DropdownChangeEvent } from 'primeng/dropdown';
import RelativeCurrency from '../../../../enums/relative-currencies';

@Component({
  selector: 'app-relative-currency-select',
  templateUrl: './relative-currency-select.component.html',
  styleUrl: './relative-currency-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelativeCurrencySelectComponent {
  @Output() private selectedCurrency = new EventEmitter<RelativeCurrency>();

  public selectOptions = Object.values(RelativeCurrency);

  public onValueChange(event: DropdownChangeEvent): void {
    this.selectedCurrency.emit(event.value);
  }
}
