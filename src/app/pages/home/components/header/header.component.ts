import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public menuItems: MenuItem[] = [{ label: 'Главная', routerLink: '' }];

  public isShrunk: boolean = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isShrunk = window.scrollY > 48;
  }
}
