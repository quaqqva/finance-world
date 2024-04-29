import { Routes } from '@angular/router';
import NotAuthrorizedGuard from './shared/guards/not-authrorized.guard';
import AuthrorizedGuard from './shared/guards/authrorized.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent,
      ),
    canActivate: [AuthrorizedGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NotAuthrorizedGuard],
  },
];
export default routes;
