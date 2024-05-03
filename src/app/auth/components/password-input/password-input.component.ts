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
  @Input({ required: true }) control!: FormControl;

  requrements: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.updateRequirements();
    });
    this.updateRequirements();
  }

  updateRequirements(): void {
    this.requrements = {
      'Одна строчная буква': this.control.hasError('hasLowerCase'),
      'Одна заглавная буква': this.control.hasError('hasUpperCase'),
      'Одна цифра': this.control.hasError('hasDigit'),
      'Минимум 8 символов':
        this.control.hasError('minlength') || this.control.hasError('required'),
      'Максимум 150 символов': this.control.hasError('maxlength'),
    };
  }
}
