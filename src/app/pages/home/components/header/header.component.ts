import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, MenuItem, PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';
import { Observable, fromEvent, map, take, throttleTime } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Logout } from '../../../../redux/actions/user/logout.action';
import { RouteUrls } from '../../../../shared/enums/routes';
import { ProfileComponent } from '../profile/profile.component';
import { UserState } from '../../../../redux/states/user/user.state';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @ViewChild('profile') profile!: ProfileComponent;

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
    private store: Store,
    router: Router,
    confirmService: ConfirmationService,
  ) {
    this.menuItems = [
      { icon: PrimeIcons.HOME, label: 'Главная', routerLink: '' },
      {
        icon: PrimeIcons.USER,
        label: 'Профиль',
        command: () => {
          this.profile.show();
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

  public ngOnInit(): void {
    this.store
      .select(UserState.UniquePhoto)
      .pipe(untilDestroyed(this))
      .subscribe((photo) => {
        if (!photo) {
          this.menuItems[1].iconStyle = undefined;
          this.menuItems[1].styleClass = undefined;
          this.menuItems = [...this.menuItems];
          return;
        }
        this.menuItems[1].iconStyle = {
          'background-image': `url(${photo})`,
        };
        this.menuItems[1].styleClass = 'header__profile-link';
        this.menuItems = [...this.menuItems];
      });
  }
}
