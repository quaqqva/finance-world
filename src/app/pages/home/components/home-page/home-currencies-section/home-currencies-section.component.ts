import { ChangeDetectionStrategy, Component } from '@angular/core';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-home-currencies-section',
  templateUrl: './home-currencies-section.component.html',
  styleUrl: './home-currencies-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCurrenciesSectionComponent {
  public activeCurrency: string = '';

  public onCurrencyChange(currency: string): void {
    this.activeCurrency = currency;
  }
}
