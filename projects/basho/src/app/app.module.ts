import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from '@auth0/auth0-angular';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PickSelectorComponent } from './pick-selector/pick-selector.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';

import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PickSelectorComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: `${environment.auth.domain}`,
      clientId: `${environment.auth.clientId}`,
      httpInterceptor: {
        allowedList: [
          `${environment.dev.serverUrl}/teams`,
          `${environment.dev.serverUrl}/rikishis/categorized`
        ],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

