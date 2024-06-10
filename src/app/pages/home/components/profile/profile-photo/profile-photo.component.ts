import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { FileUploadEvent } from 'primeng/fileupload';
import { Observable } from 'rxjs';
import { SavePhoto } from '../../../../../redux/actions/save-photo.action';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePhotoComponent {
  public userPhoto$: Observable<string>;

  public constructor(private store: Store) {
    this.userPhoto$ = store.select((state) => state.user.photo);
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
