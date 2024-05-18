import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-home-currencies-section',
  templateUrl: './home-currencies-section.component.html',
  styleUrl: './home-currencies-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCurrenciesSectionComponent {
  public currenciesMenuItems: MenuItem[] = [
    {
      icon: PrimeIcons.BITCOIN,
      label: 'BTC',
    },
    {
      icon: 'pi pi-ethereum',
      label: 'ETH',
    },
  ];

  public activeCurrency?: MenuItem;
}
