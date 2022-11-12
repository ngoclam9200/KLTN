import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
allNotification:any
  constructor(private notifiService: NotificationService) { }

  ngOnInit(): void {
    
    this.getData()
    this.seenNotifi()
  }
  getData()
  {
    this.notifiService.getAllNotification(localStorage.getItem("userId")).subscribe(res=>{
  
      this.allNotification=res
      this.allNotification=this.allNotification.data
    })
  }
  seenNotifi()
  {
    this.notifiService.seenNotifi(localStorage.getItem("userId")).subscribe(res=>{
     
    })
  }

}
