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

  private lastScrollY: number = 0;

  @HostListener('window:scroll')
  public onScroll(): void {
    const { lastScrollY } = this;
    this.lastScrollY = window.scrollY;
    this.isShrunk = lastScrollY < window.scrollY;
  }
}
