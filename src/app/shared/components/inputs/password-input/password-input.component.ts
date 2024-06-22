import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormatPasswordRequirementPipe } from './format-password-requirement.pipe';
import { TextInputComponentBase } from '../text-input-base';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  standalone: true,
  imports: [
    PasswordModule,
    DividerModule,
    OverlayPanelModule,
    NgFor,
    NgIf,
    FormsModule,
    KeyValuePipe,
    FormatPasswordRequirementPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent
  extends TextInputComponentBase
  implements OnInit
{
  @Input() public override placeholder: string = 'Пароль';

  @Input() public withCreationHints: boolean = false;

  public hints: { [error: string]: boolean } = {};

  public override get errorMessage(): string {
    if (this.control.hasError('mismatch')) return 'Пароли не совпадают';
    if (this.control.invalid && this.withCreationHints)
      return 'Пароль не соответсвует требованиям';
    return super.errorMessage;
  }

  public constructor(control: NgControl) {
    super(control);
  }

  public ngOnInit(): void {
    this.updateHints();
  }

  override writeValue(value: string): void {
    super.writeValue(value);
    this.updateHints();
  }

  private updateHints(): void {
    if (!this.withCreationHints) return;

    this.hints = {
      'Только цифры и латинские буквы':
        this.control.hasError('hasSpecialSymbols'),
      'Одна строчная буква': this.control.hasError('noLowerCaseLetter'),
      'Одна заглавная буква': this.control.hasError('noUpperCaseLetter'),
      'Одна цифра': this.control.hasError('noDigit'),
      'Минимум 8 символов':
        this.control.hasError('minlength') || this.control.hasError('required'),
      'Максимум 150 символов': this.control.hasError('maxlength'),
    };
  }
}
