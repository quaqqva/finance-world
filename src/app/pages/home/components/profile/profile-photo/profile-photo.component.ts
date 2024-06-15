import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SavePhoto } from '../../../../../redux/actions/save-photo.action';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class ProfilePhotoComponent {
  @ViewChild('fileUpload') public fileUpload!: FileUpload;

  public userPhoto$: Observable<string>;

  public constructor(private store: Store) {
    this.userPhoto$ = store.select((state) => state.user.photo);
  }

  public onPhotoUpload(event: FileUploadHandlerEvent): void {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.store
        .dispatch(new SavePhoto(fileReader.result!.toString()))
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.fileUpload.clear();
        });
    };
    fileReader.readAsDataURL(event.files[0]);
  }
}
