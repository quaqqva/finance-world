import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TextInputComponentBase } from '../text-input-base';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [InputTextModule, OverlayPanelModule, ButtonModule, NgIf],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent
  extends TextInputComponentBase
  implements DoCheck, ControlValueAccessor
{
  public override get errorMessage(): string {
    if (this.control.hasError('email')) return 'Некорректный формат почты';
    return super.errorMessage;
  }

  public constructor(control: NgControl) {
    super(control);
  }

  @HostListener('focusout')
  public onBlur(): void {
    if (this.onTouched) this.onTouched();
  }
}
