import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { take } from 'rxjs';
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

  public isShrunk: boolean = false;

  private lastScrollY: number = 0;

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

  @HostListener('window:scroll')
  public onScroll(): void {
    const { lastScrollY } = this;
    this.lastScrollY = window.scrollY;
    this.isShrunk = lastScrollY < window.scrollY;
  }
}
