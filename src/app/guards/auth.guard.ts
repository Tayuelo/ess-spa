import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';
import { LocalStorageService } from '../services/localstorage/localstorage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const localStorage = inject(LocalStorageService);

  if (route.routeConfig?.path === 'auth') {
    return authService.isAuthenticated().pipe(
      map((response: any) => {
        localStorage.set('user', response.user);
        authService.isLoggedIn.set(true);
        router.navigate(['/home']);
        return false;
      }),
      catchError(() => {
        return of(true);
      })
    );
  }

  return authService.isAuthenticated().pipe(
    map((response: any) => {
      localStorage.set('user', response.user);
      authService.isLoggedIn.set(true);
      return true;
    }),
    catchError(() => {
      authService.isLoggedIn.set(false);
      router.navigate(['/auth']);
      return of(false);
    })
  );
};
