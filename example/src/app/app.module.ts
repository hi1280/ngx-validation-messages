import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NgxValidationMessagesModule } from "ngx-validation-messages";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxValidationMessagesModule.configure({
      messages: {required: "{name} is required."}
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }