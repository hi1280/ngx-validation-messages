import { NgForm, FormGroup } from "@angular/forms";
import { Injectable, Optional } from "@angular/core";

import { VALIDATION_MESSAGES } from "./validation-messages";
import { MessagesConfiguration } from "./messages-configuration";

export interface Config {
  [key: string]: {
    [key: string]: { [key: string]: string }
  };
}

export interface FormErrors {
  [key: string]: string[];
}

/**
 * Validation messages used by form controls.
 */
@Injectable()
export class NgxValidationMessagesService {
  messages: { [key: string]: string };
  formErrors: FormErrors;

  /**
   * Set messages
   * @param config custom messages configuration
   */
  constructor(@Optional() config: MessagesConfiguration) {
    this.messages = VALIDATION_MESSAGES;
    if(config) {
      Object.assign(this.messages, config.messages);
    }
  }

  /**
   * Interpolate messages.
   *
   * Message parameters are string literals enclosed in {}.
   * 'message' keyword of parameter is the message itself.
   *
   * @param form NgForm or FormGroup instance
   * @param messageArgs message parameters
   * @returns Array of validation message for each form
   *
   * ### Return Example
   * ```js
   * {
   *   "name":["name is required","name must be at least 5."],
   *   "address":["address is required"]
   * }
   * ```
   */
  interpolate(form: any, messageArgs?: Config): FormErrors {
    this.formErrors = {};
    Object.keys(form.controls).forEach((ck) => {
      this.formErrors[ck] = [];
      let control = null;
      if((<FormGroup>form).get) {
        control = (<FormGroup>form).get(ck);
      } else {
        control = (<NgForm>form).form.get(ck);
      }

      if(control && control.dirty && !control.valid) {
        Object.keys(control.errors).forEach((ek, i) => {
          if(messageArgs) {
            this.formErrors[ck][i] = this.replacedToArgs(this.messages[ek], messageArgs[ck][ek]);
          } else {
            this.formErrors[ck][i] = this.messages[ek];
          }
        });
      }
    });
    return this.formErrors;
  }

  private replacedToArgs(message: string, args: { [key: string]: string }): string {
    let replaced = message;
    if(args["message"]) {
      replaced = args["message"];
    } else {
      Object.keys(args).forEach((arg) => {
        replaced = replaced.replace(new RegExp(`{${arg}}`, "g"), args[arg]);
      });
    }
    return replaced;
  }
}
