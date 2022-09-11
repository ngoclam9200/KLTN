import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatBoxComponent } from '../chat-box/chat-box.component';

@Component({
  selector: 'app-fab-call-chat',
  templateUrl: './fab-call-chat.component.html',
  styleUrls: ['./fab-call-chat.component.css']
})
export class FabCallChatComponent implements OnInit {

  constructor(private dialog : MatDialog, private router:Router) { }

  ngOnInit(): void {
  }
  openChatBox()
  {
    this.dialog.open(ChatBoxComponent,{
      position: {
        bottom: "0px",
        right : "0px",
      },
      maxHeight:"500px",
      width : "600px"
    })
  }
  goNotificationPage()
  {
    this.router.navigate(["/notification"])
  }
}
