import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent implements OnChanges {
  @Input() control!: FormControl;

  requrements: { [key: string]: boolean } = {};

  ngOnChanges(): void {
    this.control.valueChanges.subscribe(() => {
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
    };
  }
}
