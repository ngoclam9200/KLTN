import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
   
  constructor(private router:Router, private signInService: SigninService    ) {}
  formGroup: FormGroup
  ngOnInit(): void {
     this.initForm()
  }
  goSignUpPage() {
    this.router.navigate(['sign-up'])
  }
  initForm() {
    
    if(localStorage.getItem("isRemember")=="true" )
    {
     
      this.formGroup = new FormGroup({
        username: new FormControl(localStorage.getItem("username"), [Validators.required]),
        password: new FormControl(localStorage.getItem("password"), [Validators.required]),
        isRemember: new FormControl(true, [Validators.required])
      });
    }
    
    else{
      this.formGroup = new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        isRemember: new FormControl(false, [Validators.required])
      });
    }
    

  }
  
    signIn()
    {
      // localStorage.setItem("isLogin", "true")
      this.signInService.login(this.formGroup.value)
     
  
      
    }
}
