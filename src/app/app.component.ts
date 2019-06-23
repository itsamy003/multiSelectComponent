import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './common/validators/validators';

@Component({
  selector: 'ngr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public simpleForm: FormGroup;
  public clientOptions: Array<any>;
  public clientsList: Array<any>;
  public settings: Object;

  public clientsList2: Array<any>;
  ngOnInit() {
    this.clientOptions = [
      { id: 1, name: 'ammi', city: 'Komaripalem' },
      { id: 2, name: 'sansi', city: 'Bangalore' },
      { id: 3, name: 'vinni', city: 'Mamidada' },
      { id: 4, name: 'vinni', city: 'Mamidada' },
      { id: 5, name: 'vinni', city: 'Mamidada' },
      { id: 6, name: 'vinni', city: 'Mamidada' },
      { id: 7, name: 'vinni', city: 'Mamidada' },
      { id: 8, name: 'vinni', city: 'Mamidada' },
      { id: 9, name: 'vinni', city: 'Mamidada' },
      { id: 10, name: 'vinni', city: 'Mamidada' },
      { id: 11, name: 'vinni', city: 'Mamidada' },
      { id: 12, name: 'vinni', city: 'Mamidada' },
      { id: 13, name: 'vinni', city: 'Mamidada' },
      { id: 14, name: 'vinni', city: 'Mamidada' }
    ];
     this.clientsList2 = [
      { id: 1, name: 'ammi', city: 'Komaripalem' },
    ];
    this.settings = {
      token: {tokenView: false, maxToShow: 6 },
      hasSingleSelection: true
    };
    this.simpleForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl('dfdf', [Validators.required])
      }),
      'clientsList': new FormControl([this.clientOptions[1]], [CustomValidators.hasMinOptions(2)])
    });
  }

}
