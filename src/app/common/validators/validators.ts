import { FormControl, Validators } from '@angular/forms';

export class CustomValidators extends Validators {
  static validateCharacters(control: FormControl) {
    if ( control.value.length > 2 ) {
      return null;
    } else {
      return {error: 'Selected items should be more than 2'};
    }
  }
}
