import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ValidationMessageService } from "./src/validation-message.service";
import { MessagesConfiguration } from "./src/messages-configuration";

export * from "./src/validation-message.service";
export * from "./src/validation-messages";
export * from "./src/messages-configuration";

@NgModule({
  imports: [CommonModule],
  providers: [ValidationMessageService, MessagesConfiguration]
})
export class ValidationMessageModule {
  static configure(config: MessagesConfiguration): ModuleWithProviders {
    return {
      ngModule: ValidationMessageModule,
      providers: [{
        provide: MessagesConfiguration,
        useValue: config
      }]
    };
  }
}
