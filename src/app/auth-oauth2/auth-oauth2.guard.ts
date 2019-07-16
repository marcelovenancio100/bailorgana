import { Injectable } from "@angular/core";
import { Router, CanActivate, CanLoad } from '@angular/router';
import { tap } from 'rxjs/operators';

import { AuthOAuth2Service } from './auth-oauth2.service';

@Injectable()
export class AuthOAuth2Guard implements CanActivate, CanLoad {

    constructor(private authOAuth2Service: AuthOAuth2Service,
                private router: Router) { }

    canActivate() {
        return this.authOAuth2Service.isAuthenticated()
            .pipe(
                tap(authenticated => {
                    if (!authenticated) {
                        this.router.navigate(['/login']);
                    }
                }),
            );
    }

    canLoad() {
        return this.authOAuth2Service.isAuthenticated()
            .pipe(
                tap(authenticated => {
                    if (!authenticated) {
                        this.router.navigate(['/login']);
                    }
                }),
            );
    }
}
