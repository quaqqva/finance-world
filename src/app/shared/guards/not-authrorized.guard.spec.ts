import { TestBed } from '@angular/core/testing';

import { NotAuthrorizedGuard } from './not-authrorized.guard';

describe('NotAuthrorizedGuard', () => {
  let guard: NotAuthrorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotAuthrorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
