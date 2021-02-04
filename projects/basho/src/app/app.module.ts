import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PickSelectorComponent } from './pick-selector/pick-selector.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';

export const test = ["A","B","C"]

@NgModule({
  declarations: [
    AppComponent,
    PickSelectorComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: 'jefall.auth0.com',
      clientId: 'aVBuQ4KDAaXgOLFi4M88FCTx3yAy3qLk'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

