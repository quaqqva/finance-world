import { HttpInterceptorFn } from '@angular/common/http';

const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const newRequest = req.clone({
    url: `https://api.exmo.me/v1.1/${req.url}`,
  });
  return next(newRequest);
};

export default urlInterceptor;
