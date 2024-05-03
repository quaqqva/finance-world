import { Routes } from '@angular/router';
import authorizedGuard from './shared/guards/authorized.guard';
import notAuthrorizedGuard from './shared/guards/not-authorized.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent,
      ),
    canActivate: [authorizedGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [notAuthrorizedGuard],
  },
];
export default routes;
