import { KeyValuePipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { FormatPasswordRequirementPipe } from './format-password-requirement.pipe';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  standalone: true,
  imports: [
    PasswordModule,
    InputGroupModule,
    InputGroupAddonModule,
    DividerModule,
    NgFor,
    KeyValuePipe,
    ReactiveFormsModule,
    FormatPasswordRequirementPipe,
  ],
  // TODO: вернуть OnPush
  changeDetection: ChangeDetectionStrategy.Default,
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
