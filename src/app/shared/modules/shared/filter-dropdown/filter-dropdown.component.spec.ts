import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FilterDropdownComponent } from './filter-dropdown.component';

describe('FilterDropdownComponent', () => {
  let component: FilterDropdownComponent;
  let fixture: ComponentFixture<FilterDropdownComponent>;

  let options = {
    'ASD': 'asdfg',
    'QWE': 'qwerty',
    'ABC': 'abc',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default caption', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div label')?.textContent).toContain('Options');
  });

  it('should have specific caption', () => {
    component.caption = 'Airport';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div label')?.textContent).toContain('Airport');
  });

  it('should contain select with default id', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('select#filter-dropdown')).toBeTruthy();
  });

  it('should contain select with specific id', () => {
    component.elementId = 'abc';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('select#abc')).toBeTruthy();
  });

  it('should contain select options with empty', () => {
    component.allowNotSelected = true;
    component.options = options;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('select option').length).toBe(4);
  });

  it('should contain select options without empty', () => {
    component.allowNotSelected = false;
    component.options = options;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('select option').length).toBe(3);
  });

  it('should contain select options with specific values 1', () => {
    component.allowNotSelected = true;
    component.options = options;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const optionElements = compiled.querySelectorAll('select option');
    expect(optionElements.length).toBe(4);
    expect(optionElements[0].getAttribute('value')).toEqual('');
    expect(optionElements[0].textContent).toEqual('Select one');
    expect(optionElements[1].getAttribute('value')).toEqual('ABC');
    expect(optionElements[1].textContent).toEqual('abc');
    expect(optionElements[2].getAttribute('value')).toEqual('ASD');
    expect(optionElements[2].textContent).toEqual('asdfg');
    expect(optionElements[3].getAttribute('value')).toEqual('QWE');
    expect(optionElements[3].textContent).toEqual('qwerty');
  });

  it('should contain select options with specific values 2', () => {
    component.allowNotSelected = false;
    component.options = options;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const optionElements = compiled.querySelectorAll('select option');
    expect(optionElements.length).toBe(3);
    expect(optionElements[0].getAttribute('value')).toEqual('ABC');
    expect(optionElements[0].textContent).toEqual('abc');
    expect(optionElements[1].getAttribute('value')).toEqual('ASD');
    expect(optionElements[1].textContent).toEqual('asdfg');
    expect(optionElements[2].getAttribute('value')).toEqual('QWE');
    expect(optionElements[2].textContent).toEqual('qwerty');
  });

  it('should contain specified empty option text', () => {
    component.allowNotSelected = true;
    component.options = options;
    component.notSelectedText = 'abc';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const optionElements = compiled.querySelectorAll('select option');
    expect(optionElements.length).toBe(4);
    expect(optionElements[0].getAttribute('value')).toEqual('');
    expect(optionElements[0].textContent).toEqual('abc');
  });

  it('should contain specified selected option', () => {
    component.allowNotSelected = false;
    component.options = options;
    component.selected = 'ASD';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('select')?.value).toBe('ASD');
  });

  it('should change element', () => {
    component.allowNotSelected = false;
    component.options = options;
    component.selected = 'ASD';
    fixture.detectChanges();

    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectElement.value).toBe('ASD');

    const optionElements = fixture.debugElement.queryAll(By.css('select option'));
    expect(optionElements.length).toBe(3);

    selectElement.value = optionElements[2].nativeElement.value;
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('select'))?.nativeElement.value).toBe('QWE');
  });

  it('should call onValueChanged func when value changes', fakeAsync(() => {
    component.options = options;
    fixture.detectChanges();

    spyOn(component, 'onValueChanged');

    const optionElements = fixture.debugElement.queryAll(By.css('select option'));
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectElement.value = optionElements[2].nativeElement.value;
    selectElement.dispatchEvent(new Event('change'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.onValueChanged).toHaveBeenCalled();
    });
  }));

  it('should emit "valueChanged" when value changes', fakeAsync(() => {
    component.options = options;
    fixture.detectChanges();

    spyOn(component.valueChanged, 'emit');

    const optionElements = fixture.debugElement.queryAll(By.css('select option'));
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectElement.value = optionElements[3].nativeElement.value;
    selectElement.dispatchEvent(new Event('change'));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.valueChanged.emit).toHaveBeenCalledWith('QWE');
    });
  }));
});
