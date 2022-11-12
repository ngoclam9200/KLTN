import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiUrl=environment.apiUrl+"/ChatUser"

  constructor(private http: HttpClient) { }
 
  getMessage(id:any)
  {
    return this.http.get(this.apiUrl+"/get-message-by-userid/"+id)
  }
  sendMessage(message:any)
  {
 
    return this.http.put(this.apiUrl+"/send-message",message)
  }
  seenMessage(id:any)
  {
    return this.http.put(this.apiUrl+"/seen-message",id)
  }
}
