import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-diversification-section',
  templateUrl: './home-diversification-section.component.html',
  styleUrl: './home-diversification-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDiversificationSectionComponent {
  public heading: string = 'Мир банковских услуг изменился';
}
