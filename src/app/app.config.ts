import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { MessageService, ConfirmationService } from 'primeng/api';
import { routes } from './app.routes';
import { urlInterceptor } from './shared/interceptors/url.interceptor';
import { authResponseInterceptor } from './pages/auth/interceptors/auth-response.interceptor';
import { UserState } from './redux/states/user.state';
import { pairErrorInterceptor } from './pages/home/interceptors/pair-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        urlInterceptor,
        authResponseInterceptor,
        pairErrorInterceptor,
      ]),
    ),
    importProvidersFrom(
      NgxsModule.forRoot([UserState]),
      NgxsReduxDevtoolsPluginModule.forRoot(),
    ),
    MessageService,
    ConfirmationService,
  ],
};
