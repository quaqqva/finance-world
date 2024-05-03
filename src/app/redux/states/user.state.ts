import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, take, tap } from 'rxjs';
import { UserStateModel } from './user-state.model';
import { AuthService } from '../../auth/services/auth/auth.service';
import Login from '../actions/login.action';
import Logout from '../actions/logout.action';
import JwtHelper from '../../auth/utils/jwt/jwt-helper';
import { AuthToken } from '../../auth/models/auth-token.model';

@State<UserStateModel>({
  name: 'user',
})
@Injectable()
export default class UserState {
  public constructor(private authService: AuthService) {}

  @Action(Login)
  public login(
    ctx: StateContext<UserStateModel>,
    action: Login,
  ): Observable<AuthToken> {
    return this.authService.login(action.login, action.password).pipe(
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
    );
  }

  @Action(Logout)
  public static logout(ctx: StateContext<UserStateModel>): void {
    ctx.setState({
      login: '',
      accessToken: '',
      refreshToken: '',
    });
  }

  @Selector()
  public static isAuthorized(state: UserStateModel): boolean {
    return (
      state.login !== '' && JwtHelper.CheckIfTokenIsValid(state.refreshToken)
    );
  }
}
