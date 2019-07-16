import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.scss']
})
export class Comp2Component implements OnInit {

  constructor() { }

  ngOnInit() {}

  checkToken() {
    let key = 'auth_app_token';
    const token = localStorage.getItem(key);
    alert(`Token armazenado comp2: ${token}`);
  }
}
