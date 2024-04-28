import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';
import passwordValidator from '../validators/password.validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  formGroup = new FormGroup({
    login: new FormControl('', [
      Validators.maxLength(150),
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(150),
      Validators.required,
      passwordValidator(),
    ]),
  });

  onSubmit(event: Event, panel: OverlayPanel): void {
    if (this.formGroup.valid) {
      const values = this.formGroup.getRawValue();
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        control.markAsDirty();
      });
      panel.show(event);
    }
  }
}
