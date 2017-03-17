/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DbaseService } from './dbase.service';

describe('DbaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbaseService]
    });
  });

  it('should ...', inject([DbaseService], (service: DbaseService) => {
    expect(service).toBeTruthy();
  }));
});
