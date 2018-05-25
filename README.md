# ngx-validation-messages

[![Build Status](https://travis-ci.org/hi1280/ngx-validation-messages.svg?branch=master)](https://travis-ci.org/hi1280/ngx-validation-messages)
[![npm version](https://badge.fury.io/js/ngx-validation-messages.svg)](https://badge.fury.io/js/ngx-validation-messages)

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
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NgxValidationMessagesModule } from "ngx-validation-messages";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxValidationMessagesModule.configure({
      messages: {required: "{name} is required."}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```typescript
// app.component.ts
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
    }
  };
  value = "";
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