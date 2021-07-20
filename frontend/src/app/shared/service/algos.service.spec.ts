import { TestBed } from '@angular/core/testing';

import { AlgosService } from './algos.service';

describe('AlgosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlgosService = TestBed.get(AlgosService);
    expect(service).toBeTruthy();
  });
});
