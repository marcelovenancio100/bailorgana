import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthOAuth2Component } from './auth-oauth2.component';
import { AuthOAuth2Guard } from './auth-oauth2.guard';
import { AuthOAuth2Service } from './auth-oauth2.service';
import { TokenService } from './token/token.service';
import { TokenStorage } from './token/token-storage';
import { TokenWrapper } from './token/token-wrapper';
import { AuthOAuth2Config } from './auth-oauth2.config';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    AuthOAuth2Component,
    LoginComponent,
    LogoutComponent
  ],
  exports: [
    AuthOAuth2Component,
    LoginComponent,
    LogoutComponent
  ],
  providers: [
    AuthOAuth2Guard,
    AuthOAuth2Service,
    TokenService,
    TokenStorage,
    TokenWrapper
  ]
})
export class AuthOAuth2Module {
  static forRoot(authOAuth2Config: AuthOAuth2Config): ModuleWithProviders {
    return {
      ngModule: AuthOAuth2Module,
      providers: [AuthOAuth2Service, { provide: 'authOAuth2Config', useValue: authOAuth2Config }]
    };
  }
}
