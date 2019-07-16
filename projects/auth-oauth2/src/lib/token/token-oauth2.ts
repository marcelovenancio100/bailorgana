import { TokenNotFoundError, EmptyTokenError } from './token-errors';

const prepareOAuth2Token = (data) => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {}
  }
  return data;
};

export class TokenOAuth2 {
  private readonly token: any
  private createdAt?: Date
  private payload: any = null;

  constructor(data: { [key: string]: string | number } | string = {},
              createdAt?: Date) {

    this.token = prepareOAuth2Token(data);

    try {
      this.parsePayload();
    } catch (err) {
      if (!(err instanceof TokenNotFoundError)) {
        throw err;
      }
    }

    this.createdAt = this.prepareCreatedAt(createdAt);
  }

  prepareCreatedAt(date: Date) {
    return date ? date : new Date();
  }

  /**
  * Retorna a data de criação do token.
  * @returns Date
  */
  getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
  * Retorna o valor do token.
  * @returns string
  */
  getValue(): string {
    return this.token.access_token;
  }

  /**
  * Retorna o token atualizado.
  * @returns string
  */
  getRefreshToken(): string {
    return this.token.refresh_token;
  }

  /**
  * Seta o token atualizado.
  * @param refreshToken
  */
  setRefreshToken(refreshToken: string) {
    this.token.refresh_token = refreshToken;
  }

  protected parsePayload(): void {
    if (!this.token) {
      throw new TokenNotFoundError('Token not found.');
    } else {
      if (!Object.keys(this.token).length) {
        throw new EmptyTokenError('Cannot extract payload from an empty token.');
      }
    }
    this.payload = this.token;
  }

  /**
  * Retorna o tipo do token.
  * @returns string
  */
  getType(): string {
    return this.token.token_type;
  }

  /**
  * Verifica se o token é válido e ainda não expirou.
  * @returns boolean
  */
  isValid(): boolean {
    return !!this.getValue() && (!this.getTokenExpDate() || new Date() < this.getTokenExpDate());
  }

  /**
  * Retorna a data de expiração do token.
  * @returns Date
  */
  getTokenExpDate(): Date {
    if (!this.token.hasOwnProperty('expires_in')) {
      return null;
    }
    return new Date(this.createdAt.getTime() + Number(this.token.expires_in) * 1000);
  }

  /**
  * Converte para string.
  * @returns string
  */
  toString(): string {
    return JSON.stringify(this.token);
  }
}
