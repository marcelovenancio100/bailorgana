import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth-oauth2/components/login/login.component';
import { HomeComponent } from './commons/home/home.component';
import { AuthOAuth2Guard } from './auth-oauth2/auth-oauth2.guard';
import { ErrorsComponent } from './commons/errors/errors.component';
import { PageNotFoundComponent } from './commons/page-not-found/page-not-found.component';
import { Comp1Component } from './commons/comp1/comp1.component';
import { Comp2Component } from './commons/comp2/comp2.component';
import { Comp3Component } from './commons/comp3/comp3.component';

const routes: Routes = [
  { 
    path: 'comp1', 
    component: Comp1Component,
    canActivate: [AuthOAuth2Guard],
    canLoad: [AuthOAuth2Guard]
  },
  { 
    path: 'comp2', 
    component: Comp2Component,
    canActivate: [AuthOAuth2Guard],
    canLoad: [AuthOAuth2Guard]
  },
  { 
    path: 'comp3', 
    component: Comp3Component,
    canActivate: [AuthOAuth2Guard],
    canLoad: [AuthOAuth2Guard]
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthOAuth2Guard] 
  },
  { 
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: 'error', 
    component: ErrorsComponent
  },
  { 
    path: '**', 
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
