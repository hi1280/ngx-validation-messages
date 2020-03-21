import { NgModule, ModuleWithProviders } from '@angular/core';
import { MessagesConfiguration } from './messages-configuration';
import { NgxValidationMessagesService} from './ngx-validation-messages.service';

@NgModule({
  providers: [NgxValidationMessagesService]
})
export class NgxValidationMessagesModule {
  static configure(config: MessagesConfiguration): ModuleWithProviders<NgxValidationMessagesModule> {
    return {
      ngModule: NgxValidationMessagesModule,
      providers: [{
        provide: MessagesConfiguration,
        useValue: config
      }]
    };
  }
}
