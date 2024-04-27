import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.scss',
})
export class LoginInputComponent {
  @Input() control!: FormControl;

  onInput(event: Event, errorOverlayPanel: OverlayPanel) {
    if (!this.control.valid) {
      errorOverlayPanel.show(event);
    } else {
      errorOverlayPanel.hide();
    }
  }
}
