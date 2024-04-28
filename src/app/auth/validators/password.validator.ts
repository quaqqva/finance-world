import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export default function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const text = control.value;
    return {
      hasLowerCase: !/[a-z]/.test(text),
      hasUpperCase: !/[A-Z]/.test(text),
      hasDigit: !/\d/.test(text),
    };
  };
}
