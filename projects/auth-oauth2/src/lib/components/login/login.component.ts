import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthOAuth2Service } from '../../auth-oauth2.service';
import { AuthOAuth2Result } from '../../auth-oauth2.result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  errors: string[] = [];
  messages: string[] = [];

  constructor(private router: Router,
              private authOAuth2Service: AuthOAuth2Service) {}

  ngOnInit() {}

  login(): void {
    this.errors = [];
    this.messages = [];

    this.authOAuth2Service.authenticate(this.user).subscribe((authOAuth2Result: AuthOAuth2Result) => {
      if (authOAuth2Result.isSuccess()) {
        this.messages = authOAuth2Result.getMessages();
        this.router.navigateByUrl('/home');
      } else {
        this.errors = authOAuth2Result.getErrors();
      }
    });
  }
}
