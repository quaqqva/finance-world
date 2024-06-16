import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrl: './login-input.component.scss',
  // TODO: стратегия обнаружения изменений OnPush мешает помечиванию полей ввода как touched, из-за чего border не меняет цвет
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginInputComponent {
  @Input({ required: true }) public control!: FormControl;

  public onInput(event: Event, errorOverlayPanel: OverlayPanel): void {
    if (this.control.hasError('email')) {
      errorOverlayPanel.show(event);
    } else {
      errorOverlayPanel.hide();
    }
  }
}
