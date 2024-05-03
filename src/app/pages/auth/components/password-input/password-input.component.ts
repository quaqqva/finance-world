import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class PasswordInputComponent implements OnInit {
  @Input({ required: true }) public control!: FormControl;

  public requrements: { [key: string]: boolean } = {};

  public ngOnInit(): void {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.updateRequirements();
    });
    this.updateRequirements();
  }

  private updateRequirements(): void {
    this.requrements = {
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
