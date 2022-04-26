import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent, FaIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should see "Flights"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav div.container-fluid span.navbar-brand')?.textContent).toContain('Flights');
  });

  it('should see fa-icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav div.container-fluid span.navbar-brand fa-icon')).toBeTruthy();
  });
});
