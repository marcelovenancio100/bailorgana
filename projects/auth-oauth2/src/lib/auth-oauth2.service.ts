import { Injectable, Inject } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthOAuth2Result } from './auth-oauth2.result';
import { TokenService } from './token/token.service';
import { TokenOAuth2 } from './token/token-oauth2';
import { IllegalTokenError } from './token/token-errors';
import { AuthOAuth2Config } from './auth-oauth2.config';

@Injectable()
export class AuthOAuth2Service {

  constructor(private tokenService: TokenService,
              private http: HttpClient,
              @Inject('authOAuth2Config') private authOAuth2Config: AuthOAuth2Config) {}

  /**
  * Retorna o token atual armazenado.
  * @returns Observable<any>
  */
  getToken(): Observable<TokenOAuth2> {
    return this.tokenService.get();
  }

  /**
  * Verifica se existe um token armazenado.
  * @returns Observable<boolean>
  */
  isAuthenticated(): Observable<boolean> {
    return this.getToken()
      .pipe(map((tokenOAuth2: TokenOAuth2) => tokenOAuth2 != null && tokenOAuth2.isValid()));
  }

  /**
  * Autenticação a partir dos dados informados.
  * @param data
  * @returns Observable<AuthOAuth2Result>
  */
  authenticate(data?: any): Observable<AuthOAuth2Result> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.authOAuth2Config.clientId + ':' + this.authOAuth2Config.clientSecret)
    });

    const params = new HttpParams()
      .set('username', data.username)
      .set('password', data.password)
      .set('grant_type', 'password');

    const options = {
      headers: headers, params
    }

    return this.http.post(`${this.authOAuth2Config.baseEndpoint}/oauth/token`, null, options)
      .pipe(
        map((res: any) => {
          return new AuthOAuth2Result(true, res, [], [], new TokenOAuth2(res));
        }),
        switchMap((authOAuth2Result: AuthOAuth2Result) => {
          return this.processResultToken(authOAuth2Result);
        })
      );
  }

  /**
  * Logout do usuário e remoção do token armazenado.
  * @returns Observable<AuthOAuth2Result>
  */
  logout(): Observable<AuthOAuth2Result> {
    const url = undefined;

    return observableOf({})
      .pipe(
        switchMap((res: any) => {
          if (!url) {
            return observableOf(res);
          }
          return this.http.request('post', url, { observe: 'response' });
        }),
        map((res) => {
          this.tokenService.clear();
          return new AuthOAuth2Result(true, res, [], []);
        }),
        catchError((res) => {
          return this.handleResponseError(res, 'logout');
        })
      );
  }

  /**
  * Preparação para atualização do token.
  * @param data
  * @returns Observable<any>
  */
  prepareRefreshToken(data?: any): Observable<any> {
    const refreshToken = data.getRefreshToken();

    return this.tokenService.clear()
    .pipe(
      map(res => {
        return refreshToken;
      })
    );
  }

  /**
  * Envia uma solicitação de atualização de token.
  * @param data
  * @returns Observable<AuthOAuth2Result>
  */
  refreshToken(data?: any): Observable<AuthOAuth2Result> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.authOAuth2Config.clientId + ':' + this.authOAuth2Config.clientSecret)
    });

    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', data);

    const options = {
      headers: headers, params
    }

    return this.http.post(`${this.authOAuth2Config.baseEndpoint}/oauth/token`, null, options)
      .pipe(
        map((res: any) => {
          return new AuthOAuth2Result(true, res, [], [], new TokenOAuth2(res));
        }),
        switchMap((authOAuth2Result: AuthOAuth2Result) => {
          return this.processResultToken(authOAuth2Result);
        }),
        catchError((res) => {
          return this.handleResponseError(res, 'refreshToken');
        })
      );
  }

  private processResultToken(authOAuth2Result: AuthOAuth2Result) {
    if (authOAuth2Result.isSuccess() && authOAuth2Result.getToken()) {
      return this.tokenService.set(authOAuth2Result.getToken())
        .pipe(
          map((tokenOAuth2: TokenOAuth2) => {
            return authOAuth2Result;
          }),
        );
    }
    return observableOf(authOAuth2Result);
  }

  private handleResponseError(res: any, module: string): Observable<AuthOAuth2Result> {
    let errors = [];
    if (res instanceof HttpErrorResponse) {
      errors = res.error;
    } else if (res instanceof IllegalTokenError) {
      errors.push(res.message)
    } else {
      errors.push('Something went wrong.');
    }
    return observableOf(new AuthOAuth2Result(false, res, errors, []));
  }
}
