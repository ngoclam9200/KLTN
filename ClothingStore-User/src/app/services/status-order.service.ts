import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusOrderService {

  apiUrl=environment.apiUrl+"/StatusOrder"
 
  constructor( private http: HttpClient ,) { }
  getAllStatus()
  {
    return this.http.get(this.apiUrl + "/get-all-statusorder")
  }
}
