import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var messageBody = <HTMLVideoElement>document.querySelector('#parentDiv');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
     
  }

}
