import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ConfirmationService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { passwordValidator } from '../../../../shared/components/password-input/password.validator';
import { SavePhoto } from '../../../../redux/actions/save-photo.action';
import { UserStateModel } from '../../../../redux/states/user/user-state.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public profileVisible: boolean = false;

  public passwordInputVisible: boolean = false;

  public confirmPopupVisible: boolean = false;

  public email!: string;

  public userPhoto!: string;

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
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.store
      .select((state) => state.user)
      .subscribe((user: UserStateModel) => {
        this.email = user.login;
        this.userPhoto = user.photo;
        this.changeDetectorRef.detectChanges();
      });
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
        this.passwordInputVisible = false;
        this.profileVisible = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  public onPhotoUpload(event: FileUploadEvent): void {
    const { files } = event;
    if (files.length !== 1) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.files[0]);
    fileReader.onload = () => {
      this.store.dispatch(new SavePhoto(fileReader.result!.toString()));
    };
  }
}
