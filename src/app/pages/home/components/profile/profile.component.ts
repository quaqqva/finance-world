import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { passwordValidator } from '../../../../shared/components/password-input/password.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public static DIALOG_CONFIG: DynamicDialogConfig = {
    header: 'Ваши данные',
    draggable: false,
    modal: true,
    dismissableMask: true,
    closeOnEscape: false,
  };

  public mode: 'view' | 'edit' = 'view';

  public modeTransitionGoing: boolean = false;

  public email$: Observable<string>;

  public passwordForm = new FormGroup({
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(8),
        Validators.maxLength(150),
        Validators.required,
        passwordValidator(),
      ],
    }),
    passwordConfirm: new FormControl('', {
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
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    store: Store,
  ) {
    this.email$ = store.selectOnce((state) => state.user.login);
  }

  public onPasswordFormSubmit(): void {
    if (this.passwordForm.invalid) {
      return;
    }

    this.confirmationService.confirm({
      message: 'Вы действительно хотите изменить пароль?',
      header: 'Подтверждение',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {
        this.dialogRef.close();
        this.messageService.add({
          severity: 'success',
          summary: 'Успех',
          detail: 'Пароль успешно обновлён',
        });
      },
    });
  }
}
