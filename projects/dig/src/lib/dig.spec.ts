import { TestBed } from '@angular/core/testing';

import { Dig } from './dig';

describe('DigService', () => {
  let service: Dig;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
