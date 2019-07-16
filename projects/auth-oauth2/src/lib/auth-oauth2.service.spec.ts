import { TestBed } from '@angular/core/testing';

import { AuthOAuth2Service } from './auth-oauth2.service';

describe('AuthOAuth2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthOAuth2Service = TestBed.get(AuthOAuth2Service);
    expect(service).toBeTruthy();
  });
});
