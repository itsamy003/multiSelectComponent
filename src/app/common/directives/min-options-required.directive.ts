import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, ValidatorFn, FormControl } from '@angular/forms';
import { CustomValidators } from '../validators/validators';

@Directive({
  selector: '[ngrMinOptionsRequired][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinOptionsRequiredDirective, multi: true }
  ]
})
export class MinOptionsRequiredDirective {
  @Input ('ngrMinOptionsRequired') minRequired: any;
  validator: ValidatorFn;
  constructor() { }
  validate(c: FormControl) {
    console.log(this.minRequired, 'min');
     if ( !c.value ) { return; }
    return  CustomValidators.hasMinOptions(this.minRequired)(c);
  }

}
