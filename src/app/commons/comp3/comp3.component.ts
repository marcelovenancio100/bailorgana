import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.scss']
})
export class Comp3Component implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  checkToken() {
    let key = 'auth_app_token';
    const token = localStorage.getItem(key);
    alert(`Token armazenado comp3: ${token}`);
  }

  validRequest() {
    this.getUsers().subscribe(res => {
      let result = "";
      res.forEach(function (value) {
        result += `firstname: ${value.firstname} - lastname: ${value.lastname}\n`;
      });
      alert(result);
    });
  }

  public getUsers(): Observable<Array<any>> {
    return this.http.get<Array<any>>(`http://localhost:8080/api/users`);
  }

}
