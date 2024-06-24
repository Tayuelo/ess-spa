import { HttpInterceptorFn } from '@angular/common/http';

export const demoInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls = ['/login'];
  const isExcluded = excludedUrls.some((url) => req.url.includes(url));

  const modifiedReq = isExcluded
    ? req
    : req.clone({
        withCredentials: true
      });

  return next(modifiedReq);
};
