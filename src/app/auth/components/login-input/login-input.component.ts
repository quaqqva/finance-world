import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginInputComponent {
  @Input({ required: true }) control!: FormControl;

  onInput(event: Event, errorOverlayPanel: OverlayPanel): void {
    if (this.control.hasError('email')) {
      errorOverlayPanel.show(event);
    } else {
      errorOverlayPanel.hide();
    }
  }
}
