import { TestBed } from '@angular/core/testing';

import { AuthrorizedGuard } from './authrorized.guard';

describe('AuthrorizedGuard', () => {
  let guard: AuthrorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthrorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
