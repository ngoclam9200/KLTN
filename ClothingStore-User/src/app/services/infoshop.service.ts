import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoshopService {

  apiUrl=environment.apiUrl+"/InfoShop"
 
  constructor( private http: HttpClient ,) { }
  
  getInfoShop()
  {
    
    return this.http.get(this.apiUrl+"/get-info/" )
  }
}
