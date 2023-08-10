import { TestBed } from '@angular/core/testing';

import { DbmoviesService } from './dbmovieservice.service';

describe('DbmovieserviceService', () => {
  let service: DbmoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbmoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
