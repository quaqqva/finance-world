import { Routes } from '@angular/router';
import authorizedGuard from './shared/guards/authorized.guard';
import notAuthrorizedGuard from './shared/guards/not-authorized.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [authorizedGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [notAuthrorizedGuard],
  },
];
export default routes;
