import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY, catchError, take, tap } from 'rxjs';
import { UserStateModel } from './user-state.model';
import { AuthService } from '../../auth/services/auth/auth.service';
import Login from '../actions/login.action';
import Logout from '../actions/logout.action';
import JwtHelper from '../../auth/utils/jwt/jwt-helper';

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
        take(1),
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
    ctx.setState({
      login: '',
      accessToken: '',
      refreshToken: '',
    });
  }

  @Selector()
  static isAuthorized(state: UserStateModel) {
    return () => {
      return (
        state.login !== '' && JwtHelper.CheckIfTokenIsValid(state.refreshToken)
      );
    };
  }
}
