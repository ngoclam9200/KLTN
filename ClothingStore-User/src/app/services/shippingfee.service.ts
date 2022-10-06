import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingfeeService {

  apiUrl=environment.apiUrl+"/ShippingFee"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  
  searchShippingFee(name:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-shippingfee-by-name/"+name, {headers:headers})
  }
}
