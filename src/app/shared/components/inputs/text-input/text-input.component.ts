import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TextInputBaseComponent } from '../text-input-base.component';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [InputTextModule, OverlayPanelModule, ButtonModule, NgIf],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent extends TextInputBaseComponent {
  public override get errorMessage(): string {
    if (this.control.hasError('email')) return 'Некорректный формат почты';
    return super.errorMessage;
  }

  public constructor(
    control: NgControl,
    public elementRef: ElementRef,
  ) {
    super(control);
  }
}
