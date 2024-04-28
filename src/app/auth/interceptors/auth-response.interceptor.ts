import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
import JwtHelper from '../utils/jwt/jwt-helper';

const authResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        return event.clone({
          body: {
            accessToken: JwtHelper.GenerateToken(),
            refreshToken: JwtHelper.GenerateToken(),
          },
        });
      }
      return event;
    }),
  );
};

export default authResponseInterceptor;
