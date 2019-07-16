import { Injectable } from '@angular/core';

import { TokenWrapper } from './token-wrapper';
import { TokenOAuth2 } from './token-oauth2';

@Injectable()
export class TokenStorage {
    protected key = 'auth_app_token';

    constructor(private tokenWrapper: TokenWrapper) {}

    /**
    * Retorna o token armazenado em localStorage.
    * @returns TokenOAuth2
    */
    get(): TokenOAuth2 {
        const raw = localStorage.getItem(this.key);
        return this.tokenWrapper.unwrap(raw);
    }

    /**
    * Seta o token no localStorage.
    * @param TokenOAuth2 tokenOAuth2
    */
    set(tokenOAuth2: TokenOAuth2) {
        const raw = this.tokenWrapper.wrap(tokenOAuth2);
        localStorage.setItem(this.key, raw);
    }

    /**
    * Limpa o token do localStorage.
    */
    clear() {
        localStorage.removeItem(this.key);
    }
}
