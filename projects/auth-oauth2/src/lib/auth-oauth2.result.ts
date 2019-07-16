import { TokenOAuth2 } from './token/token-oauth2';

export class AuthOAuth2Result {
  protected tokenOAuth2: TokenOAuth2;
  protected errors: string[] = [];
  protected messages: string[] = [];

  constructor(protected success: boolean,
              protected response?: any,
              errors?: any,
              messages?: any,
              tokenOAuth2: TokenOAuth2 = null) {

    this.errors = this.errors.concat([errors]);
    if (errors instanceof Array) {
      this.errors = errors;
    }

    this.messages = this.messages.concat([messages]);
    if (messages instanceof Array) {
      this.messages = messages;
    }

    this.tokenOAuth2 = tokenOAuth2;
  }

  getResponse(): any {
    return this.response;
  }

  getToken(): TokenOAuth2 {
    return this.tokenOAuth2;
  }

  getErrors(): string[] {
    return this.errors.filter(val => !!val);
  }

  getMessages(): string[] {
    return this.messages.filter(val => !!val);
  }

  isSuccess(): boolean {
    return this.success;
  }

  isFailure(): boolean {
    return !this.success;
  }
}
