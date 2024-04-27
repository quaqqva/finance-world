import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.scss',
})
export class LoginInputComponent {
  @Input() control!: FormControl;
}
