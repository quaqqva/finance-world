import { HttpInterceptorFn } from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const newRequest = req.clone({
    url: `https://api.exmo.me/v1.1/${req.url}`,
    setHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return next(newRequest);
};
