import { Component, OnInit } from '@angular/core';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  brandIcon = faPlaneDeparture;

  constructor() { }

  ngOnInit(): void {
  }

}
