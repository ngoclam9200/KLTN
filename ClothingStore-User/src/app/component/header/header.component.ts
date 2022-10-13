import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
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
 countProductInCart:any
  constructor(private router: Router,private signInService :SigninService, private cartService:CartService ) { }
  @Input() active = "";
  ngOnInit(): void {
    if(localStorage.getItem("isLogin")=="true")
    
    {
      this.isLogin=true
      this.username=localStorage.getItem("username")
      this.getCountProductInCart()
    }
    
    this.signInService.isLogin.subscribe(res=>{
      this.isLogin=true
      this.getCountProductInCart()
    })
    this.signInService.username.subscribe(res=>{
      
      this.username=res
       
    })
    this.signInService.countProductInCart.subscribe(res=>{
      
      this.countProductInCart=res
    })

  }
  
  logOut()
  {
    if(localStorage.getItem("isRemember")=="true")
    {
      localStorage.removeItem("token")
      localStorage.removeItem("isLogin")
      localStorage.removeItem("role")
      localStorage.removeItem("userId")
      this.isLogin=false
      this.router.navigate(['sign-in'])
    
    }
    else{
      localStorage.clear();
      this.isLogin=false
      this.router.navigate(['sign-in'])
    }
   
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
  
  getCountProductInCart()
  {
    this.cartService.getCountProductInCart(localStorage.getItem("userId")).subscribe(res=>
      {
        
        this.countProductInCart=(res)


      })
  }

}
