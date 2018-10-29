import { Component, AfterViewChecked } from '@angular/core';
import { NgxValidationMessagesService, FormErrors } from 'ngx-validation-messages';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html'
})
export class ReactiveFormsComponent implements AfterViewChecked {
  config = {
    'name': {
      required: { name: 'Name' }
    },
    'address': {
      required: { name: 'Address' },
      minlength: { name: 'Address', min: '4'}
    }
  };
  form = this.fb.group({
    name: ['', Validators.required],
    address: ['', [Validators.required, Validators.minLength(4)]],
  });
  formErrors: FormErrors;

  constructor(private fb: FormBuilder, private validator: NgxValidationMessagesService) { }

  ngAfterViewChecked() {
    if (this.form.valueChanges) {
      this.form.valueChanges
        .subscribe(() => this.onValueChanged());
    }
  }
  onValueChanged() {
    this.formErrors = this.validator.interpolate(this.form, this.config);
  }

}
