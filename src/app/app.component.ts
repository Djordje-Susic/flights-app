import { Component, OnInit } from '@angular/core';
import { FlydataService } from './shared/services/flydata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Flights';

  constructor(
    private flydataService: FlydataService
  ) { }

  ngOnInit(): void {
    this.flydataService.getAll().subscribe(
      response => {
        console.log(response);
      }
    );
  }

}
