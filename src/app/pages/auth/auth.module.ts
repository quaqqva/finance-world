import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { routes } from './auth.routes';
import { PasswordInputComponent } from '../../shared/components/inputs/password-input/password-input.component';
import { TextInputComponent } from '../../shared/components/inputs/text-input/text-input.component';

@NgModule({
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent],
  imports: [
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    PasswordInputComponent,
    ReactiveFormsModule,
    TextInputComponent,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
