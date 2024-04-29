import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import UserState from '../../redux/states/user.state';

@Injectable({
  providedIn: 'root',
})
export default class NotAuthrorizedGuard implements CanActivate {
  public constructor(private store: Store) {}

  canActivate(): MaybeAsync<GuardResult> {
    return this.store.select(UserState.isAuthorized).pipe(
      map((isAuthorizedFn) => {
        return !isAuthorizedFn();
      }),
    );
  }
}
