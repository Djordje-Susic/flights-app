import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { FlightsTableComponent } from './flights-table/flights-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SpinnerComponent,
    FilterDropdownComponent,
    FlightsTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
