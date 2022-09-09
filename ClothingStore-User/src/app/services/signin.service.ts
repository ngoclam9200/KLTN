import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  
  @Output()
  isLogin = new EventEmitter();
  constructor(private router: Router, private http: HttpClient) {

  }


 login()
 {
  this.isLogin.emit(true)

 }
}
