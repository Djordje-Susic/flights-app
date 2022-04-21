import { TestBed } from '@angular/core/testing';

import { FlydataService } from './flydata.service';

describe('FlydataService', () => {
  let service: FlydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
