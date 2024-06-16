import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

export function matchValidator(
  controlName: string,
  matchingControlName: string,
): ValidatorFn {
  return (formControl: AbstractControl): ValidationErrors | null => {
    const form = formControl as FormGroup;
    const control = form.controls[controlName];
    const matchingControl = form.controls[matchingControlName];

    if (control.value !== matchingControl.value) {
      return {
        matching: {
          control: controlName,
          matchingControl: matchingControlName,
        },
      };
    }
    return null;
  };
}
