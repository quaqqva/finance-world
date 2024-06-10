import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { passwordValidator } from '../../../../shared/components/password-input/password.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public profileVisible: boolean = false;

  public passwordInputVisible: boolean = false;

  public confirmPopupVisible: boolean = false;

  public email$: Observable<string>;

  public formGroup = new FormGroup({
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(8),
        Validators.maxLength(150),
        Validators.required,
        passwordValidator(),
      ],
    }),
  });

  public constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    store: Store,
  ) {
    this.email$ = store.select((state) => state.user.login);
  }

  public show(): void {
    this.profileVisible = true;
    this.changeDetectorRef.detectChanges();
  }

  public onPasswordButtonClick(): void {
    if (!this.passwordInputVisible) {
      this.passwordInputVisible = true;
      return;
    }
    this.confirmationService.confirm({
      message: 'Вы действительно хотите изменить пароль?',
      header: 'Подтверждение',
      accept: () => {
        this.profileVisible = false;
        this.passwordInputVisible = false;
      },
    });
  }
}
