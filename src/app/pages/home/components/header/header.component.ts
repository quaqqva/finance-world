import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, fromEvent, map, throttleTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public menuItems: MenuItem[] = [{ label: 'Главная', routerLink: '' }];

  public isShrunk$: Observable<boolean> = fromEvent(window, 'scroll').pipe(
    throttleTime(100),
    map(() => {
      const { lastScrollY } = this;
      this.lastScrollY = window.scrollY;
      return lastScrollY < window.scrollY;
    }),
  );

  private lastScrollY: number = 0;
}
