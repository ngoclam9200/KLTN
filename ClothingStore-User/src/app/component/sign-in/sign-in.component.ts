import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router:Router, private signInService: SigninService) { }

  ngOnInit(): void {
     
  }
  goSignUpPage() {
    this.router.navigate(['sign-up'])
  }
  
    signIn()
    {
      localStorage.setItem("isLogin", "true")
      this.signInService.login()
      this.router.navigate(['home'])
  
      
    }
}
