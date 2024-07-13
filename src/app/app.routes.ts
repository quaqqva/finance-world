import { Routes } from '@angular/router';
import { authorizedGuard } from './shared/guards/authorized.guard';
import { notAuthorizedGuard } from './shared/guards/not-authorized.guard';
import { RouteUrls } from './shared/enums/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RouteUrls.Home,
    pathMatch: 'full',
  },
  {
    path: RouteUrls.Home,
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [authorizedGuard],
  },
  {
    path: RouteUrls.Login,
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [notAuthorizedGuard],
  },
];
