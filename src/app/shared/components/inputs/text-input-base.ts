import {
  Directive,
  DoCheck,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';

@Directive()
export abstract class TextInputComponentBase
  implements DoCheck, ControlValueAccessor
{
  @Input() public withClearButton: boolean = true;

  @Input() public placeholder: string = '';

  public get errorMessage(): string {
    switch (true) {
      case this.control.hasError('required'):
        return 'Поле обязательно для заполнения';
      case this.control.hasError('minlength'):
        return `Минимальная длина ${this.control.getError('minlength')?.requiredLength} символов`;
      case this.control.hasError('maxlength'):
        return `Максимальная длина ${this.control.getError('maxlength')?.requiredLength} символов`;
      default:
        return '';
    }
  }

  public get currentValue(): string {
    return this.value;
  }

  public disabled: boolean = false;

  @ViewChild('errorPanel') protected errorPanel!: OverlayPanel;

  @ViewChild('input', { read: ElementRef })
  protected input!: ElementRef<HTMLElement>;

  protected value: string = '';

  protected onValueChange: ((value: string) => void) | null = null;

  protected onTouched: (() => void) | null = null;

  public constructor(public control: NgControl) {
    this.control.valueAccessor = this;
  }

  public ngDoCheck(): void {
    if (this.control.touched && this.onTouched) this.onTouched();
  }

  public writeValue(value: string): void {
    this.value = value;
    if (this.onValueChange) this.onValueChange(this.value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onValueChange = (value: string) => {
      fn(value);
      if (this.control.invalid)
        this.errorPanel.show({ target: this.input.nativeElement });
      else this.errorPanel.hide();
    };
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = () => {
      fn();
      if (this.control.invalid)
        this.errorPanel.show({ target: this.input.nativeElement });
    };
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('focusout')
  public onBlur(): void {
    if (this.onTouched) this.onTouched();
  }
}
