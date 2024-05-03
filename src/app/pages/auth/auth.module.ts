import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import routes from './auth.routes';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { LoginInputComponent } from './components/login-input/login-input.component';
import { FormatPasswordRequirementPipe } from './pipes/format-password-requirement.pipe';

@NgModule({
  declarations: [
    LoginPageComponent,
    PasswordInputComponent,
    LoginInputComponent,
    FormatPasswordRequirementPipe,
  ],
  exports: [LoginPageComponent],
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
