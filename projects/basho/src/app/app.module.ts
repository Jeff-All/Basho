import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RikshiComponent } from './rikshi/rikshi.component';
import { PickSelectorComponent } from './pick-selector/pick-selector.component';

export const test = ["A","B","C"]

@NgModule({
  declarations: [
    AppComponent,
    RikshiComponent,
    PickSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

