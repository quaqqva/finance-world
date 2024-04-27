import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    InputTextModule,
    PasswordModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  formGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });
}
