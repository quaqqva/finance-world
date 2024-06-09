import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Observable, fromEvent, map, take, throttleTime } from 'rxjs';
import { Logout } from '../../../../redux/actions/logout.action';
import { RouteUrls } from '../../../../shared/enums/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public menuItems: MenuItem[];

  private lastScrollY: number = 0;

  public isShrunk$: Observable<boolean> = fromEvent(window, 'scroll').pipe(
    throttleTime(100),
    map(() => {
      const { lastScrollY } = this;
      this.lastScrollY = window.scrollY;
      return lastScrollY < window.scrollY;
    }),
  );

  public constructor(
    store: Store,
    router: Router,
    confirmService: ConfirmationService,
  ) {
    this.menuItems = [
      { label: 'Главная', routerLink: '' },
      {
        label: 'Выход',
        command: () => {
          confirmService.confirm({
            message: 'Вы действительно хотите выйти?',
            header: 'Подтверждение',
            accept: () => {
              store
                .dispatch(new Logout())
                .pipe(take(1))
                .subscribe(() => {
                  router.navigate([RouteUrls.Login]);
                });
            },
          });
        },
      },
    ];
  }
}
