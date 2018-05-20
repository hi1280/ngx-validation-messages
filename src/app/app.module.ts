import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxValidationMessagesModule } from 'ngx-validation-messages';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxValidationMessagesModule.configure({
      messages: {required: '{name} is required.'}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
