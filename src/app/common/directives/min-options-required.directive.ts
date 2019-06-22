import { Directive } from '@angular/core';
import { NG_VALIDATORS, ValidatorFn, FormControl } from '@angular/forms';
import { CustomValidators } from '../validators/validators';

@Directive({
  selector: '[ngrMinOptionsRequired][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinOptionsRequiredDirective, multi: true }
  ]
})
export class MinOptionsRequiredDirective {

  validator: ValidatorFn;
  constructor() { }
  validate(c: FormControl) {
     if ( !c.value ) { return; }
    return  CustomValidators.validateCharacters(c);
  }

}
