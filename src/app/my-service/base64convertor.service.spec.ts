import { TestBed } from '@angular/core/testing';

import { Base64convertorService } from './base64convertor.service';

describe('Base64convertorService', () => {
  let service: Base64convertorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64convertorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
