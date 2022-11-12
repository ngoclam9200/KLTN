import { Component, OnInit } from '@angular/core';
import { AboutusService } from 'src/app/services/aboutus.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
 allMember:any
 isLogin:boolean=false
  constructor( private aboutusService :AboutusService, private signInService:SigninService) { }

  ngOnInit(): void {
    if(localStorage.getItem("isLogin")=="true")
    
    {
      this.isLogin=true
     
    }
    
    this.signInService.isLogin.subscribe(res=>{
      this.isLogin=true
     
    })
    
    this.getData()
  }
  getData()
  {
    this.aboutusService.getAllAdmin().subscribe(res=>{
       this.allMember=res
      this.allMember=this.allMember.data
      
    })
  }

}
