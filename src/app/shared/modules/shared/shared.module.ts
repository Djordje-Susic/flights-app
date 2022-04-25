import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { ArrDepPipe } from './pipes/arr-dep.pipe';
import { EmptyTextPipe } from './pipes/empty-text.pipe';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SpinnerComponent,
    FilterDropdownComponent,
    EmptyTextPipe,
    ArrDepPipe,
  ],
  exports: [
    CommonModule,
    SpinnerComponent,
    FilterDropdownComponent,
    EmptyTextPipe,
    ArrDepPipe,
  ],
  providers: [
    EmptyTextPipe,
    ArrDepPipe,
  ]
})
export class SharedModule { }
