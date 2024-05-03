import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import passwordValidator from '../../validators/password.validator';
import Login from '../../../redux/actions/login.action';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class LoginPageComponent {
  @ViewChild('submitErrorPanel') submitErrorPanel!: OverlayPanel;

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

  public constructor(
    private store: Store,
    private router: Router,
  ) {}

  onSubmit(event: Event): void {
    if (this.formGroup.valid) {
      const values = this.formGroup.getRawValue();
      this.store
        .dispatch(new Login(values.login!, values.password!))
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } else {
      Object.values(this.formGroup.controls).forEach((control) => {
        control.markAsDirty();
      });
      this.submitErrorPanel.show(event);
    }
  }

  onSubmitButtonMouseOut() {
    this.submitErrorPanel.hide();
  }
}
