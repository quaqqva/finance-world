import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeEntryComponent } from './components/home-entry/home-entry.component';

const routes: Routes = [
  {
    path: '',
    component: HomeEntryComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
    ],
  },
];
export default routes;
