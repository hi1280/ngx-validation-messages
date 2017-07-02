# ngx-validation-messages

## Overview
Validation messages used by form controls of Angular.

#### Feature
* custom messages configuration
* Interpolate messages by Message parameters

## Installation

To install this library, run:

```bash
$ npm install ngx-validation-messages --save
```
## Usage

```typescript
// app.module.ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ValidationMessageModule } from "./validation-message/validation-message.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ValidationMessageModule.configure({
      messages: {required: "{name} is required."}
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```typescript
// app.component.ts
import { Component, AfterViewChecked, ViewChild } from "@angular/core";
import { ValidationMessageService } from "ngx-validation-messages";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements AfterViewChecked {
  config = {
    "name": {
      required: { name: "Name" }
    }
  };
  value = "";
  formErrors: {};
  form: NgForm;
  @ViewChild("form") currentForm: NgForm;

  constructor(private validator: ValidationMessageService) {}

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
```
'interpolate' method that return Array of validation message for each form

**Example**
```js
{
  "name":["name is required","name must be at least 5."],
  "address":["address is required"]
}
```

```html
<!-- app.component.html -->
<div class="container">
  <form #form="ngForm">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" class="form-control" required name="name" [(ngModel)]="value">
      <div *ngIf="formErrors && formErrors.name.length > 0" class="alert alert-danger">
        <span *ngFor="let e of formErrors.name">
          {{ e }}
        </span>
      </div>
    </div>
  </form>
</div>
```

#### custom message configuration

'message' keyword of parameter is the message itself.
```typescript
 config = {
    "name": {
      required: { message: "Name is invalid." }
    }
  };
```