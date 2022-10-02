import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 isLogin=false;
 timedOutCloser:any;
 username:any;
  constructor(private router: Router,private signInService :SigninService ) { }
  @Input() active = "";
  ngOnInit(): void {
    if(localStorage.getItem("isLogin")=="true")
    
    {
      this.isLogin=true
      this.username=localStorage.getItem("username")
    }
    
    this.signInService.isLogin.subscribe(res=>{
      this.isLogin=true
    })
    this.signInService.username.subscribe(res=>{
      
      this.username=res
    })

  }
  logOut()
  {
    localStorage.clear();
    this.isLogin=false
    this.router.navigate(['sign-in'])
  }
  goProductPage() {
    this.router.navigate(['products'])
  }
  goHomePage() {
    this.router.navigate(['home'])
  }
  goAboutUsPage() {
    this.router.navigate(['about-us'])
  }
  goContactUsPage() {
    this.router.navigate(['contact-us'])
  }
  goSignInPage() {
    this.router.navigate(['sign-in'])
  }
  goSignUpPage() {
    this.router.navigate(['sign-up'])
  }
  goShoppingCartPage() {
    this.router.navigate(['shopping-cart'])
  }
  goProfilePage() {
    this.router.navigate(['profile'])
  }
  goOrderPage() {
    this.router.navigate(['orders'])
  }
  mouseEnter(trigger:any) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }
  

  mouseLeave(trigger:any) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 100);
  }
  

}
