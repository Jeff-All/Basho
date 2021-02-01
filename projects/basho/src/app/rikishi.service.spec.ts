import { TestBed } from '@angular/core/testing';

import { RikishiService } from './rikishi.service';

describe('RikishiService', () => {
  let service: RikishiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RikishiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
