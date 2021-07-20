import { FormGroup, ValidatorFn } from '@angular/forms';

export function passwordMustMatch(): ValidatorFn {
  return (passwordGroup: FormGroup): {[key: string]: any} | null => {
    if (passwordGroup.get('password').value !== passwordGroup.get('repeatPassword').value) {
      return { validatePassword: true };
    }
    return null;
  };
}
