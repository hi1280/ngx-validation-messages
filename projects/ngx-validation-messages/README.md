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

Choose the version corresponding to your Angular version:

 Angular     | version
 ----------- | ------------------- 
 6,7,8       | 2.x
 5           | 1.x          
 4           | 0.x          

## Usage

[Usage for Reactive Forms](https://github.com/hi1280/ngx-validation-messages/tree/master/src/app/reactive-forms)  
[Usage for Template-driven Forms](https://github.com/hi1280/ngx-validation-messages/tree/master/src/app/template-driven-forms)  

'interpolate' method of NgxValidationMessagesService that return Array of validation message for each form

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
