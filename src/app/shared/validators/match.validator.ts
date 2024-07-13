import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function matchValidator(matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlValue = control.value;
    const matchingControlValue =
      control.parent?.get(matchingControlName)?.value;

    if (controlValue !== matchingControlValue) {
      return { mismatch: true };
    }

    return null;
  };
}
