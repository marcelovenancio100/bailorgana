import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOAuth2Component } from './auth-oauth2.component';

describe('AuthOAuth2Component', () => {
  let component: AuthOAuth2Component;
  let fixture: ComponentFixture<AuthOAuth2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthOAuth2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthOAuth2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
