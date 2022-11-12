import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
isLogin:boolean=false
  constructor(private signInService:SigninService) { }

  ngOnInit(): void {
    if(localStorage.getItem("isLogin")=="true")
    
    {
      this.isLogin=true
     
    }
    
    this.signInService.isLogin.subscribe(res=>{
      this.isLogin=true
     
    })
  }

}
