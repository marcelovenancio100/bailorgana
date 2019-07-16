import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of as observableOf } from "rxjs";
import { Router } from '@angular/router';

import { AuthOAuth2Service } from '../auth-oauth2.service';
import { TokenOAuth2 } from './token-oauth2';
import { AuthOAuth2Result } from '../auth-oauth2.result';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authOAuth2Service: AuthOAuth2Service,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authOAuth2Service.getToken()
      .pipe(
        switchMap((tokenOAuth2: TokenOAuth2) => {
          if (tokenOAuth2.getValue()) {
            req = this.cloneRequest(req, tokenOAuth2.getValue());
          }

          return next.handle(req).pipe(
            catchError(error => {
              if (error instanceof HttpErrorResponse) {
                switch (error.status) {
                  case 409:
                    console.log('error 409');
                    return this.handleGeneralError(error);
                  case 404:
                    console.log('error 404');
                    return this.handleGeneralError(error);
                  case 403:
                    console.log('error 403');
                    return this.refreshToken(req, next);
                  case 0:
                    console.log('error 0');
                    return this.refreshToken(req, next);
                  case 401:
                    console.log('error 401');
                    return this.router.navigate(['login']);
                  case 400:
                    console.log('error 400');
                    return this.router.navigate(['login']);
                }
              }
              Observable.throw(error);
            })
          );
        })
      );
  }

  private refreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authOAuth2Service.getToken()
      .pipe(
        switchMap((tokenOAuth2: TokenOAuth2) => {
          return this.authOAuth2Service.prepareRefreshToken(tokenOAuth2)
            .pipe(
              switchMap((res: any) => {
                return this.authOAuth2Service.refreshToken(res)
                  .pipe(
                    switchMap((authOAuth2Result: AuthOAuth2Result) => {
                      if (authOAuth2Result.getToken().getValue()) {
                        req = this.cloneRequest(req, authOAuth2Result.getToken().getValue());
                        return next.handle(req);
                      }
                    })
                  );
              })
            );
        })
      );
  }

  private handleGeneralError(error) {
    if (error.status === 409 || error.status === 404) {
      return this.authOAuth2Service.logout();
    }
    return observableOf(null);
  }

  private cloneRequest(req: HttpRequest<any>, tokenValue: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenValue}`,
      },
    });
  }
}
