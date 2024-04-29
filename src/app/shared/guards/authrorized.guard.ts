import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import UserState from '../../redux/states/user.state';

@Injectable({
  providedIn: 'root',
})
export default class AuthrorizedGuard implements CanActivate {
  public constructor(private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
    return this.store.select(UserState.isAuthorized).pipe(
      map((isAuthorizedFn) => {
        const isAuthorized = isAuthorizedFn();
        if (isAuthorized) return true;
        return createUrlTreeFromSnapshot(route, ['/login']);
      }),
    );
  }
}
