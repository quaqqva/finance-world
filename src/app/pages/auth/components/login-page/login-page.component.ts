import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Login } from '../../../../redux/actions/user/login.action';
import { RouteUrls } from '../../../../shared/enums/routes';

@UntilDestroy()
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  public formGroup = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.maxLength(150),
        Validators.required,
        Validators.email,
      ],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(8),
        Validators.maxLength(150),
        Validators.required,
      ],
    }),
  });

  public isLoading: boolean = false;

  public constructor(
    private store: Store,
    private router: Router,
  ) {}

  public onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const values = this.formGroup.getRawValue();
    this.isLoading = true;
    this.store
      .dispatch(new Login(values.login, values.password))
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigate([RouteUrls.Home]);
      });
  }
}
