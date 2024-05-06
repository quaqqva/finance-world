import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public currentYear: number = new Date().getFullYear();

  public socialLinks: MenuItem[] = [
    { icon: PrimeIcons.TELEGRAM, url: '' },
    {
      icon: PrimeIcons.TWITTER,
      url: '',
    },
    {
      icon: PrimeIcons.LINKEDIN,
      url: '',
    },
  ];
}
