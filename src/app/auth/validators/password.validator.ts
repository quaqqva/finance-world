import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export default function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const text = control.value;
    const errors: ValidationErrors = {};
    if (!/[a-z]/.test(text)) errors['hasLowerCase'] = true;
    if (!/[A-Z]/.test(text)) errors['hasUpperCase'] = true;
    if (!/\d/.test(text)) errors['hasDigit'] = true;
    return errors;
  };
}
