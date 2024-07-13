import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';
import { Observable, fromEvent, map, take, throttleTime } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { Logout } from '../../../../redux/actions/user/logout.action';
import { RouteUrls } from '../../../../shared/enums/routes';
import { ProfileComponent } from '../profile/profile.component';
import { UserState } from '../../../../redux/states/user/user.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public menuItems: MenuItem[];

  private lastScrollY: number = 0;

  public profileIcon$: Observable<string | null> = this.store.select(
    UserState.UniquePhoto,
  );

  public isShrunk$: Observable<boolean> = fromEvent(window, 'scroll').pipe(
    throttleTime(100),
    map(() => {
      const { lastScrollY } = this;
      this.lastScrollY = window.scrollY;
      return lastScrollY < window.scrollY;
    }),
  );

  public constructor(
    private store: Store,
    router: Router,
    confirmService: ConfirmationService,
    dialogService: DialogService,
  ) {
    this.menuItems = [
      { icon: PrimeIcons.HOME, label: 'Главная', role: 'link', routerLink: '' },
      {
        icon: PrimeIcons.USER,
        label: 'Профиль',
        role: 'profile',
        command: () => {
          dialogService.open(ProfileComponent, ProfileComponent.DIALOG_CONFIG);
        },
      },
      {
        icon: PrimeIcons.SIGN_OUT,
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
