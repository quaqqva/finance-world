import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-currencies-section',
  templateUrl: './home-currencies-section.component.html',
  styleUrl: './home-currencies-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCurrenciesSectionComponent {}
