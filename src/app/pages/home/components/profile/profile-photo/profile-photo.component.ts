import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { ProfileImageCropperComponent } from '../profile-image-cropper/profile-image-cropper.component';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePhotoComponent {
  @ViewChild('fileUpload') public fileUpload!: FileUpload;

  public userPhoto$: Observable<string>;

  public constructor(
    private dialogService: DialogService,
    store: Store,
  ) {
    this.userPhoto$ = store.select((state) => state.user.photo);
  }

  public onPhotoUpload(event: FileUploadHandlerEvent): void {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.fileUpload.clear();
      this.dialogService.open(ProfileImageCropperComponent, {
        ...ProfileImageCropperComponent.DIALOG_PARAMS,
        data: { photo: fileReader.result!.toString() },
      });
    };
    fileReader.readAsDataURL(event.files[0]);
  }
}
