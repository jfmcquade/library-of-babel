import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '@angular/cdk/text-field'
import { FormsModule } from '@angular/forms';
import { UserNamePipe } from './pipes/user-name.pipe';
import { MessageComponent } from './components/message/message/message.component';
import { LoadingComponent } from './components/loading/loading/loading.component';
import { DomChangeDirective } from './directives/dom-change.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    UserNamePipe,
    MessageComponent,
    LoadingComponent,
    DomChangeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TextFieldModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
