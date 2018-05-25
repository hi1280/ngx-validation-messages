import { NgForm, NgModel } from "@angular/forms";
import { TestBed } from "@angular/core/testing";

import { NgxValidationMessagesService } from "./ngx-validation-messages.service";
import { NgxValidationMessagesModule } from "../index";

describe("ValidationMessageService", () => {
  let service: NgxValidationMessagesService;
  let ngForm: any;

  describe("is messages config", () => {
    beforeEach(() => {
      ngForm = {
        controls: { "name": true, "power": true }, form: {
          get: function () { }
        }
      };
      TestBed.configureTestingModule({
        imports: [NgxValidationMessagesModule.configure({
          messages: {appForbiddenName: "Someone named \"{forbiddenName}\" cannot be a hero."}
        })]
      });
      service = TestBed.get(NgxValidationMessagesService);
    });
    it("validate method to required", () => {
      const messageArgs = {
        name: { required: { name: "name" } },
        power: { required: { name: "power" } }
      };
      spyOn(ngForm.form, "get").and.callFake(function () {
        return {
          dirty: true,
          errors: { "required": true }
        };
      });
      expect(service.interpolate(ngForm, messageArgs)).toEqual({
        "name": ["name is required."],
        "power": ["power is required."]
      });
    });
    it("validate method to minlength", () => {
      const messageArgs = {
        name: { minlength: { name: "name", min: "1" } },
        power: { minlength: { name: "power", min: "2" } }
      };
      spyOn(ngForm.form, "get").and.callFake(function () {
        return {
          dirty: true,
          errors: { "minlength": true }
        };
      });
      expect(service.interpolate(ngForm, messageArgs)).toEqual({
        "name": ["name must be at least 1 characters long."],
        "power": ["power must be at least 2 characters long."]
      });
    });
    it("validate method to custom message", () => {
      const messageArgs = {
        name: { required: { message: "required" } },
        power: { required: { message: "is required" } }
      };
      spyOn(ngForm.form, "get").and.callFake(function () {
        return {
          dirty: true,
          errors: { "required": true }
        };
      });
      expect(service.interpolate(ngForm, messageArgs)).toEqual({
        "name": ["required"],
        "power": ["is required"]
      });
    });
    it("validate method to custom validate", () => {
      const messageArgs = {
        name: { appForbiddenName: { forbiddenName: "name" } },
        power: { appForbiddenName: { forbiddenName: "power" } }
      };
      spyOn(ngForm.form, "get").and.callFake(function () {
        return {
          dirty: true,
          errors: { "appForbiddenName": true }
        };
      });
      expect(service.interpolate(ngForm, messageArgs)).toEqual({
        "name": ["Someone named \"name\" cannot be a hero."],
        "power": ["Someone named \"power\" cannot be a hero."]
      });
    });
    it("validate method not message args config", () => {
      spyOn(ngForm.form, "get").and.callFake(function () {
        return {
          dirty: true,
          errors: { "required": true }
        };
      });
      expect(service.interpolate(ngForm)).toEqual({
        "name": ["{name} is required."],
        "power": ["{name} is required."]
      });
    });
  });
  describe("is not messages config", () => {
    beforeEach(() => {
      ngForm = {
        controls: { "name": true, "power": true }, form: {
          get: function () { }
        }
      };
      TestBed.configureTestingModule({
        imports: [NgxValidationMessagesModule]
      });
      service = TestBed.get(NgxValidationMessagesService);
    });
    it("validate method to required", () => {
      const messageArgs = {
        name: { required: { name: "name" } },
        power: { required: { name: "power" } }
      };
      spyOn(ngForm.form, "get").and.callFake(function () {
        return {
          dirty: true,
          errors: { "required": true }
        };
      });
      expect(service.interpolate(ngForm, messageArgs)).toEqual({
        "name": ["name is required."],
        "power": ["power is required."]
      });
    });
  });
});
