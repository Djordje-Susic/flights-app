import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FlightsTableComponent } from './flights-table/flights-table.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from './shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FlightsTableComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
