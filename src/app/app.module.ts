import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { FlightsTableComponent } from './flights-table/flights-table.component';
import { EmptyTextPipe } from './shared/pipes/empty-text.pipe';
import { ArrDepPipe } from './shared/pipes/arr-dep.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SpinnerComponent,
    FilterDropdownComponent,
    FlightsTableComponent,
    EmptyTextPipe,
    ArrDepPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
