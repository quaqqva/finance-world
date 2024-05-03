import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export default function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const text = control.value;
    const errors: ValidationErrors = {};
    if (!/^[a-zA-Z0-9]+$/.test(text)) errors['hasSpecialSymbols'] = true;
    if (!/[a-zа-я]/.test(text)) errors['noLowerCaseLetter'] = true;
    if (!/[A-ZА-Я]/.test(text)) errors['noUpperCaseLetter'] = true;
    if (!/\d/.test(text)) errors['noDigit'] = true;
    return errors;
  };
}
