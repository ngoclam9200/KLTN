import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { CartService } from './cart.service';
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  data: any
  decodedToken: any
  apiUrl = environment.apiUrl + "/User"
 
  roleRes: any
  roleName: any

  
  @Output()
  isLogin = new EventEmitter();
  isLoginFailed = new EventEmitter();
  countProductInCart = new EventEmitter();
  errText=new EventEmitter();
  username = new EventEmitter();
  constructor(private router: Router, private http: HttpClient, private cartService:CartService) {

  }



 login(data:any)
 {
  let headers = new HttpHeaders();
  return this.http.post(this.apiUrl + "/login-user", data, { headers: headers }).subscribe(res => {
       this.data = res
      let token = this.data.data
      
      localStorage.setItem("token", token)
      this.decodedToken = jwt_decode(token);
 
      localStorage.setItem("isLogin", "true")
      localStorage.setItem("usernameLogin", data.username)
      localStorage.setItem("username", this.decodedToken.username)
      localStorage.setItem("role", "user")
      localStorage.setItem("userId", this.decodedToken.id)
      localStorage.setItem("isRemember",data.isRemember)
      this.username.emit(this.decodedToken.username)
      this.isLogin.emit(true)
      
      localStorage.setItem("password", data.password)
      this.getCountProductInCart()
      this.router.navigate(['home'])



 

 
  },err=>{
    
      var error:any
      error=err
      error=error.error.message
       this.errText.emit(error)
      this.isLoginFailed.emit(true)
     
      
  })





 }
 getCountProductInCart()
  {
    this.cartService.getCountProductInCart(localStorage.getItem("userId")).subscribe(res=>
      {
         this.countProductInCart.emit(res)


      })
  }
}
