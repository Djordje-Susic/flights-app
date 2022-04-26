import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { FlightsTableComponent } from './flights-table/flights-table.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FilterDropdownComponent } from './shared/modules/shared/filter-dropdown/filter-dropdown.component';
import { SpinnerComponent } from './shared/modules/shared/spinner/spinner.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        FooterComponent,
        FilterDropdownComponent,
        NavBarComponent,
        FaIconComponent,
        SpinnerComponent,
        FlightsTableComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Flights'`, () => {
    expect(app.title).toEqual('Flights');
  });

  it('should render NavBar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-nav-bar')).toBeTruthy();
  });

  it('should render airport filter', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-filter-dropdown')).toBeTruthy();
  });

  it('should render spinner while loading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-spinner')).toBeTruthy();
  });

  it('should render footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should render flights table', () => {
    app.isLoading = false;
    app.flightsByAirport = {'OSL':[]};
    app.selectedAirport = 'OSL';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-flights-table')).toBeTruthy();
  });
});
