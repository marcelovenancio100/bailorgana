import { Injectable } from '@angular/core';

import { TokenOAuth2 } from './token-oauth2';
import { TokenPack } from './token-pack';

@Injectable()
export class TokenWrapper {

  constructor() {}

  wrap(tokenOAuth2: TokenOAuth2): string {
    return JSON.stringify({
      value: tokenOAuth2.toString(),
      createdAt: tokenOAuth2.getCreatedAt().getTime(),
    });
  }

  unwrap(value: string): TokenOAuth2 {
    let tokenValue = '';
    let tokenCreatedAt: Date = null;

    const tokenPack: TokenPack = this.parseTokenPack(value);
    if (tokenPack) {
      tokenValue = tokenPack.value;
      tokenCreatedAt = new Date(Number(tokenPack.createdAt));
    }

    return new TokenOAuth2(tokenValue, tokenCreatedAt);
  }

  protected parseTokenPack(value): TokenPack {
    try {
      return JSON.parse(value);
    } catch (e) {}

    return null;
  }
}
