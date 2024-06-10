import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { routes } from './auth.routes';
import { LoginInputComponent } from './components/login-input/login-input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';

@NgModule({
  declarations: [LoginPageComponent, LoginInputComponent],
  exports: [LoginPageComponent],
  imports: [
    CommonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    PasswordInputComponent,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
