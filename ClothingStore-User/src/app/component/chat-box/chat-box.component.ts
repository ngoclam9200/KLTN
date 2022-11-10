import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
 
import Pusher from 'pusher-js';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  constructor(private chatService:ChatService) { }
  listMessage:any
 currentMessage:any
 currentAvatarUser:any
 message:string=""
 currentMessageId:any
 isSeen:boolean=true
  ngOnInit(): void {

    Pusher.logToConsole = true;

    const pusher = new Pusher('05ba42f251be5a21e7fa', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
  
      
 
      if(data.chatId==this.currentMessageId)
      this.listMessage.push(data.message);
  
    });
   
    var messageBody = <HTMLVideoElement>document.querySelector('#parentDiv');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight+100;
 
 
    
    
 


     
    
    this.getMessage()
  }
  getMessage()
  {
    this.chatService.getMessage(localStorage.getItem("userId")).subscribe(res=>
      {
 
        this.currentMessage=res
    
        this.currentMessageId=this.currentMessage[0].chatId;
    
        this.currentMessage=this.currentMessage[0].message
      this.listMessage=this.currentMessage.split("|")
   

        


      })
  }
  checkMes(mes:any)
  {  
   
    if(mes.split(",")[0]=="admin")
    { 
       
  
      mes.split(",")[0]=="admin"
      return true;
    } 
    else 
    {
     
      return false;
    }
  }
  formatDate(date:any)
  {
    if(new Date().getDate()==new Date(date).getDate() && new Date().getMonth()==new Date(date).getMonth() && new Date().getFullYear== new Date(date).getFullYear )
    return "Hôm nay"
    if(new Date().getDate()==new Date(date).getDate()+1 && new Date().getMonth()==new Date(date).getMonth() && new Date().getFullYear== new Date(date).getFullYear )
    return "Hôm qua"
    var d=new Date(date).getDate() + "/"+ (new Date(date).getMonth()+1).toString() +"/" +new Date(date).getFullYear()
    
    return d
  }
  sendMessage()
  {
   var data={
      id: this.currentMessageId,
      message: this.message,
      isAdmin:false
    }
 
     this.chatService.sendMessage(data).subscribe(res=>{
       this.message=""
   
    })
  }


}
