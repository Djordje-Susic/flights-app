import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css']
})
export class FilterDropdownComponent implements OnInit {
  @Input() elementId: string = 'filter-dropdown';
  @Input() options: {[key: string]: string} = {};
  @Input() selected?: string;
  @Input() allowNotSelected: boolean = true;
  @Input() notSelectedText: string = 'Select one';
  @Output() valueChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onValueChanged(event: any){
    this.valueChanged.emit(event.target.value);
  }
}
