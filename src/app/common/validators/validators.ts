import { FormControl, Validators } from '@angular/forms';

export class CustomValidators extends Validators {
  // static validateCharacters(control: FormControl) {
  //   if ( control.value.length > 2 ) {
  //     return null;
  //   } else {
  //     return {error: 'Selected items should be more than 2'};
  //   }
  // }
  static hasMinOptions(min) {
    return (control: FormControl) => {
      if (control.value.length > min) {
        return null;
      } else {
        return { error: 'Selected items should be more than 2' };
      }
    };
  }
}
