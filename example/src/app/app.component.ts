import { Component, AfterViewChecked, ViewChild } from "@angular/core";
import { NgxValidationMessagesService, FormErrors } from "ngx-validation-messages";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements AfterViewChecked {
  config = {
    "name": {
      required: { name: "Name" }
    },
    "address": {
      required: { name: "Address" },
      minlength: { name: "Address", min: "4"}
    }
  };
  name = "";
  address = "";
  formErrors: FormErrors;
  form: NgForm;
  @ViewChild("form") currentForm: NgForm;

  constructor(private validator: NgxValidationMessagesService) {}

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if(this.currentForm === this.form) { return; }
    this.form = this.currentForm;
    if(this.form && this.form.valueChanges) {
      this.form.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if(!this.form) { return; }
    this.formErrors = this.validator.interpolate(this.form, this.config);
  }

}
