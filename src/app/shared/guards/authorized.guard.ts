import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import UserState from '../../redux/states/user.state';

const authorizedGuard: CanActivateFn = (route) => {
  const store = inject(Store);
  return store
    .select(UserState.isAuthorized)
    .pipe(
      map(
        (isAuthorized) =>
          isAuthorized || createUrlTreeFromSnapshot(route, ['/login']),
      ),
    );
};

export default authorizedGuard;