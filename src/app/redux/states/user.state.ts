import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, take, tap } from 'rxjs';
import { UserStateModel } from './user-state.model';
import { AuthService } from '../../pages/auth/services/auth.service';
import Login from '../actions/login.action';
import Logout from '../actions/logout.action';
import JwtHelper from '../../pages/auth/utils/jwt/jwt-helper';
import { AuthToken } from '../../pages/auth/models/auth-token.model';
import LocalStorageHelper from '../utils/local-storage-helper';
import LocalStorageStates from '../enums/local-storage-key';

@State<UserStateModel>({
  name: 'user',
  defaults: LocalStorageHelper.GetItem<UserStateModel>(
    LocalStorageStates.User,
  ) || {
    login: '',
    accessToken: '',
    refreshToken: '',
  },
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
        const newState = {
          login: action.login,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        };
        LocalStorageHelper.SetItem(LocalStorageStates.User, newState);
        ctx.patchState(newState);
      }),
      catchError(() => {
        return EMPTY;
      }),
    );
  }

  @Action(Logout)
  public logout(ctx: StateContext<UserStateModel>): void {
    ctx.setState({
      login: '',
      accessToken: '',
      refreshToken: '',
    });
    LocalStorageHelper.RemoveItem(LocalStorageStates.User);
  }

  @Selector()
  public static isAuthorized(state: UserStateModel): boolean {
    return (
      state.login !== '' && JwtHelper.CheckIfTokenIsValid(state.refreshToken)
    );
  }
}
