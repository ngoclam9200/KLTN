import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Pusher from 'pusher-js';
import { ChatService } from 'src/app/services/chat.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ChatBoxComponent } from '../chat-box/chat-box.component';

@Component({
  selector: 'app-fab-call-chat',
  templateUrl: './fab-call-chat.component.html',
  styleUrls: ['./fab-call-chat.component.css']
})
export class FabCallChatComponent implements OnInit {
  countMesUnread:any=0
  countNotifiUnread:any=0
  currentMessageId:string
  constructor(private dialog : MatDialog,private notifiService:NotificationService,
     private router:Router, private chatService :ChatService) { }
 data:any
 route:any
 isNewMessage:any
 

  ngOnInit(): void {
  this.route=this.router.url
 
  
    Pusher.logToConsole = true;

    const pusher = new Pusher('05ba42f251be5a21e7fa', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
 
      if(data.isAdminSend==true)
      this.getCountMesUnread() 
    });
    
    const channelnotifi = pusher.subscribe('my-order');
    channelnotifi.bind('confirm-order', data => {
      this.getNotifiUnread()
    });
    this.getCountMesUnread()
    this.getNotifiUnread()
  }
  getNotifiUnread()
  {
    this.notifiService.getCountNotifi(localStorage.getItem("userId")).subscribe(res=>
      {
         this.countNotifiUnread=res
      })
  }
  getCountMesUnread()
  {
    this.chatService.getMessage(localStorage.getItem("userId")).subscribe(res=>{
      
      this.data=res

      
      this.data=this.data[0]
      this.isNewMessage=this.data.isNewMessageUser
      this.currentMessageId=this.data.chatId
  
      if(this.isNewMessage==true) this.countMesUnread=1
      else  this.countMesUnread=0
    })
  }
  openChatBox()
  {
    const dialogRef=this.dialog.open(ChatBoxComponent,{
      position: {
        bottom: "0px",
        right : "0px",
      },
      maxHeight:"500px",
      width : "600px"
    })
    dialogRef.afterClosed().subscribe(res=>
      {
     
        
        var data={
          chatId: this.currentMessageId,
          isAdmin: false,
        }
        this.chatService.seenMessage(data).subscribe(res=>
          {
            this.getCountMesUnread()
          })
      
      })

  }
  
  goNotificationPage()
  {
    this.router.navigate(["/notification"])
  }
}
