import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutusService {

  apiUrl=environment.apiUrl+"/Admin"
 
  constructor( private http: HttpClient ,) { }
  
  getAllAdmin()
  {
     
    return this.http.get(this.apiUrl+"/get-all-admin/" )
  }
 
}
