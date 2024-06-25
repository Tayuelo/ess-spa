import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },

  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.page').then((m) => m.AuthPage),
    canActivate: [authGuard],
  },
  {
    path: 'partner-detail/:id',
    loadComponent: () =>
      import('./pages/partner-detail/partner-detail.page').then(
        (m) => m.PartnerDetailPage
      ),
  },
  {
    path: 'partner-detail/:partnerId/branch/:branchId',
    loadComponent: () =>
    import('./pages/branch-detail/branch-detail.page').then(
      (m) => m.BranchDetailPage
    ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
