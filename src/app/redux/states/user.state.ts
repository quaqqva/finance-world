import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import { UserStateModel } from './user-state.model';
import { AuthService } from '../../auth/services/auth/auth.service';
import Login from '../actions/login.action';
import Logout from '../actions/logout.action';

@State<UserStateModel>({
  name: 'user',
})
@Injectable()
export default class UserState {
  public constructor(private authService: AuthService) {}

  @Action(Login)
  login(ctx: StateContext<UserStateModel>, action: Login) {
    this.authService
      .login(action.login, action.password)
      .pipe(
        tap((tokens) => {
          ctx.patchState({
            login: action.login,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
        }),
        catchError(() => {
          ctx.patchState({});
          return EMPTY;
        }),
      )
      .subscribe();
  }

  // eslint-disable-next-line class-methods-use-this
  @Action(Logout)
  logout(ctx: StateContext<UserStateModel>) {
    ctx.patchState({});
  }
}
