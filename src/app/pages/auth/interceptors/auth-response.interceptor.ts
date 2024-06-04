import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { JwtHelper } from '../utils/jwt/jwt-helper';
import { Endpoints } from '../../../shared/enums/endpoints';

export const authResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => {
      if (
        event instanceof HttpResponse &&
        event.url?.endsWith(Endpoints.Auth)
      ) {
        return event.clone({
          body: {
            accessToken: JwtHelper.GenerateAccessToken(),
            refreshToken: JwtHelper.GenerateRefreshToken(),
          },
        });
      }
      return event;
    }),
  );
};
