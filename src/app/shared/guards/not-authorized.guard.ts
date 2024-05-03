import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import UserState from '../../redux/states/user.state';

const notAuthorizedGuard: CanActivateFn = () => {
  const store = inject(Store);
  return store
    .select(UserState.isAuthorized)
    .pipe(map((isAuthorized) => !isAuthorized));
};

export default notAuthorizedGuard;