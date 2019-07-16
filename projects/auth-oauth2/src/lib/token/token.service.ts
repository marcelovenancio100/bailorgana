import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { filter, share } from 'rxjs/operators';

import { TokenStorage } from './token-storage';
import { TokenOAuth2 } from './token-oauth2';

@Injectable()
export class TokenService {
  protected token$: BehaviorSubject<TokenOAuth2> = new BehaviorSubject(null);

  constructor(protected tokenStorage: TokenStorage) {
    this.publishStoredToken();
  }

  /**
  * Publica o token quando ele é alterado.
  * @returns Observable<Token>
  */
  tokenChange(): Observable<TokenOAuth2> {
    return this.token$
      .pipe(
        filter(value => !!value),
        share(),
      );
  }

  /**
  * Seta o token no armazenamento.
  * Este método é usado pelo AuthService automaticamente.
  * @param TokenOAuth2 tokenOAuth2
  * @returns Observable<any>
  */
  set(tokenOAuth2: TokenOAuth2): Observable<null> {
    this.tokenStorage.set(tokenOAuth2);
    this.publishStoredToken();
    return observableOf(null);
  }

  /**
  * Retorna um observable do token corrente.
  * @returns Observable<TokenOAuth2>
  */
  get(): Observable<TokenOAuth2> {
    const tokenOAuth2 = this.tokenStorage.get();
    return observableOf(tokenOAuth2);
  }

  /**
  * Remove o token e o valor do token publicado.
  * @returns Observable<any>
  */
  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.publishStoredToken();
    return observableOf(null);
  }

  protected publishStoredToken() {
    this.token$.next(this.tokenStorage.get());
  }
}
