import { ChangeDetectionStrategy, Component } from '@angular/core';
import 'chartjs-adapter-date-fns';
import RelativeCurrency from '../../../models/relative-currencies.enum';

@Component({
  selector: 'app-home-currencies-section',
  templateUrl: './home-currencies-section.component.html',
  styleUrl: './home-currencies-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCurrenciesSectionComponent {
  public activeCurrency?: string;

  public relativeCurrency?: RelativeCurrency;

  public onCurrencyChange(currency: string): void {
    this.activeCurrency = currency;
  }

  public onRelativeCurrencyChange(currency: RelativeCurrency): void {
    this.relativeCurrency = currency;
  }
}
