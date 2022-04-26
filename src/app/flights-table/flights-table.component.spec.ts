import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { faPlaneArrival, faPlaneDeparture, faPlaneCircleExclamation, faPlaneCircleXmark, faClock } from '@fortawesome/free-solid-svg-icons';

import { FlightsTableComponent } from './flights-table.component';
import { By } from '@angular/platform-browser';
import { EmptyTextPipe } from '../shared/modules/shared/pipes/empty-text.pipe';
import { ArrDepPipe } from '../shared/modules/shared/pipes/arr-dep.pipe';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';

describe('FlightsTableComponent', () => {
  let component: FlightsTableComponent;
  let fixture: ComponentFixture<FlightsTableComponent>;

  // private airportService : AirportService,
  // private flightStatusService : FlightStatusService,
  // private airlineService : AirlineService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        FlightsTableComponent,
        EmptyTextPipe,
        ArrDepPipe,
        FaIconComponent,
        DatePipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsTableComponent);
    component = fixture.componentInstance;

    component.flights = {
      'BDU': [
        {
          airline: "SK",
          airport: "OSL",
          arr_dep: "A",
          dom_int: "D",
          flight_id: "SK393",
          schedule_time: new Date("2022-04-26T14:30:00Z"),
          uniqueID: "10582719",
          status: {
            code: "A",
            time: new Date("2022-04-26T14:32:00Z")
          }
        },
        {
          airline: "SK",
          airport: "OSL",
          arr_dep: "D",
          dom_int: "D",
          flight_id: "SK396",
          schedule_time: new Date("2022-04-26T15:00:00Z"),
          uniqueID: "10582731",
        },
        {
          airline: "SK",
          airport: "OSL",
          arr_dep: "A",
          dom_int: "D",
          flight_id: "SK398",
          schedule_time: new Date("2022-04-26T18:30:00Z"),
          uniqueID: "20582718",
        },
        {
          airline: "SK",
          airport: "OSL",
          arr_dep: "D",
          dom_int: "D",
          flight_id: "SK394",
          schedule_time: new Date("2022-04-26T18:30:00Z"),
          uniqueID: "10582718",
        },
      ],
      'OSL': [
        {
          airline: "SK",
          airport: "BDU",
          arr_dep: "D",
          dom_int: "D",
          flight_id: "SK393",
          schedule_time: new Date("2022-04-26T12:25:00Z"),
          uniqueID: "10582719",
        },
        {
          airline: "SK",
          airport: "BDU",
          arr_dep: "A",
          dom_int: "D",
          flight_id: "SK396",
          schedule_time: new Date("2022-04-26T16:45:00Z"),
          uniqueID: "10582731",
        },
      ]
    }

    component.selectedAirportCode = 'BDU';

    component.airportMap = {
      'OSL': 'Oslo Airport, Gardermoen',
      'BDU': 'Bardufoss Airport',
    };

    component.flightStatusMap = {
      'N': { statusTextEn: 'New info', icon: faPlaneCircleExclamation },
      'E': { statusTextEn: 'New time', icon: faClock },
      'D': { statusTextEn: 'Departed', icon: faPlaneDeparture },
      'A': { statusTextEn: 'Arrived', icon: faPlaneArrival },
      'C': { statusTextEn: 'Cancelled', icon: faPlaneCircleXmark },
    };

    component.airlineMap = {
      'SK': 'SAS',
    };

    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain table with specified headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table.table')).toBeTruthy();
    expect(compiled.querySelector('table.table thead tr th:nth-of-type(1)')?.textContent).toEqual('Flight');
    expect(compiled.querySelector('table.table thead tr th:nth-of-type(2)')?.textContent).toEqual('Departure');
    expect(compiled.querySelector('table.table thead tr th:nth-of-type(3)')?.textContent).toEqual('Arrival');
    expect(compiled.querySelector('table.table thead tr th:nth-of-type(4)')?.textContent).toEqual('Direction');
    expect(compiled.querySelector('table.table thead tr th:nth-of-type(5)')?.textContent).toEqual('Airport Name');
    expect(compiled.querySelector('table.table thead tr th:nth-of-type(6)')?.textContent).toEqual('Status');
  });

  it('should contain n table rows', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRows = compiled.querySelectorAll('table.table tbody tr');
    expect(tableRows.length).toEqual(4);
  });

  it('should contain flight_id', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRow = compiled.querySelector('table.table tbody tr:nth-of-type(1)');

    expect(tableRow?.querySelector('td:nth-of-type(1) div:nth-of-type(1)')?.textContent).toEqual('SK393');
  });

  it('should contain airline name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRow = compiled.querySelector('table.table tbody tr:nth-of-type(1)');

    expect(tableRow?.querySelector('td:nth-of-type(1) div:nth-of-type(2)')?.textContent).toEqual('SAS');
  });

  it('should contain piped departure time', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRow = compiled.querySelector('table.table tbody tr:nth-of-type(1)');

    expect(tableRow?.querySelector('td:nth-of-type(2)')?.textContent).toEqual('14:25');
  });

  it('should contain piped arrival time', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRow = compiled.querySelector('table.table tbody tr:nth-of-type(1)');

    expect(tableRow?.querySelector('td:nth-of-type(3)')?.textContent).toEqual('16:30');
  });

  it('should contain direction', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRow = compiled.querySelector('table.table tbody tr:nth-of-type(1)');

    expect(tableRow?.querySelector('td:nth-of-type(4)')?.textContent).toEqual('Arrival');
  });

  it('should contain airport name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRow = compiled.querySelector('table.table tbody tr:nth-of-type(1)');

    expect(tableRow?.querySelector('td:nth-of-type(5)')?.textContent).toEqual('Oslo Airport, Gardermoen');
  });

  it('should contain flight status data and icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRow = compiled.querySelector('table.table tbody tr:nth-of-type(1)');

    expect(tableRow?.querySelector('td:nth-of-type(6) span')?.getAttribute('title')).toEqual('Arrived');
    expect(tableRow?.querySelector('td:nth-of-type(6) span span.icon-container fa-icon')).toBeTruthy();
    expect(tableRow?.querySelector('td:nth-of-type(6) span')?.textContent).toContain('16:32');
  });

  it('should contain "unknown" departure time if mirroring flight is not present in data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRow = compiled.querySelector('table.table tbody tr:nth-of-type(3)');

    expect(tableRow?.querySelector('td:nth-of-type(2)')?.textContent).toEqual('unknown');
  });

  it('should contain "unknown" arrival time if mirroring flight is not present in data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tableRow = compiled.querySelector('table.table tbody tr:nth-of-type(4)');

    expect(tableRow?.querySelector('td:nth-of-type(3)')?.textContent).toEqual('unknown');
  });

  it('should contain 0 rows if data is empty', () => {
    component.flights = { 'BDU': [] };
    component.ngOnChanges();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tableRows = compiled.querySelectorAll('table.table tbody tr');
    expect(tableRows.length).toEqual(0);
  });

  it('should display "No data found" if data is empty', () => {
    component.flights = { 'BDU': [] };
    component.ngOnChanges();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('div.table-container span')?.textContent).toEqual('No data found');
  });
});
