import { TestBed } from '@angular/core/testing';

import { PointSortieService } from './point-sortie.service';

describe('PointSortieService', () => {
  let service: PointSortieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointSortieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
