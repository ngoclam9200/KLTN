import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  @Input() active = "";
  constructor(private userService: UserService) { }
  dataUser:any
  ngOnInit(): void {
    this.userService.getUserById(localStorage.getItem("userId")).subscribe(res=>{
  
      this.dataUser=res
      this.dataUser=this.dataUser.data
      console.log(this.dataUser)
    })
   

  }

}
