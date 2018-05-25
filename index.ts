import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgxValidationMessagesService } from "./src/ngx-validation-messages.service";
import { MessagesConfiguration } from "./src/messages-configuration";

export * from "./src/ngx-validation-messages.service";
export * from "./src/validation-messages";
export * from "./src/messages-configuration";

@NgModule({
  imports: [CommonModule],
  providers: [NgxValidationMessagesService, MessagesConfiguration]
})
export class NgxValidationMessagesModule {
  static configure(config: MessagesConfiguration): ModuleWithProviders {
    return {
      ngModule: NgxValidationMessagesModule,
      providers: [{
        provide: MessagesConfiguration,
        useValue: config
      }]
    };
  }
}
