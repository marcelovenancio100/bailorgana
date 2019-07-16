import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthOAuth2Service } from '../../auth-oauth2.service';
import { AuthOAuth2Result } from '../../auth-oauth2.result';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  redirectDelay: number = 0;

  constructor(private router: Router,
              private authOAuth2Service: AuthOAuth2Service) {

    this.redirectDelay = 0;
  }

  ngOnInit() {}

  logout(): void {
    this.authOAuth2Service.logout().subscribe((authOAuth2Result: AuthOAuth2Result) => {
      setTimeout(() => {
        return this.router.navigateByUrl('/');
      }, this.redirectDelay);
    });
  }
}
