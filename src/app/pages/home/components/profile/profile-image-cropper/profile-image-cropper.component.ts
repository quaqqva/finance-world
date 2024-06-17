import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';
import { SavePhoto } from '../../../../../redux/actions/save-photo.action';

@UntilDestroy()
@Component({
  selector: 'app-profile-image-cropper',
  templateUrl: './profile-image-cropper.component.html',
  styleUrl: './profile-image-cropper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileImageCropperComponent {
  public static DIALOG_PARAMS: DynamicDialogConfig = {
    header: 'Обрезка фото',
    draggable: false,
    modal: true,
    dismissableMask: true,
    closeOnEscape: false,
  };

  public originalImage: string;

  private resultImage: string;

  public constructor(
    private dialogRef: DynamicDialogRef,
    private store: Store,
    private messageService: MessageService,
    config: DynamicDialogConfig,
  ) {
    this.originalImage = config.data.photo;
    this.resultImage = this.originalImage;
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.resultImage = event.base64!;
  }

  public onSave(): void {
    this.store
      .dispatch(new SavePhoto(this.resultImage))
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.dialogRef.close();
        this.messageService.add({
          severity: 'success',
          summary: 'Успех',
          detail: 'Фото успешно обновлено',
          key: 'dialog-toast',
        });
      });
  }
}
