import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.scss']
})
export class Comp1Component implements OnInit {

  constructor() { }

  ngOnInit() {}

  checkToken() {
    let key = 'auth_app_token';
    const token = localStorage.getItem(key);
    alert(`Token armazenado comp1: ${token}`);
  }
}
