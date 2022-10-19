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
  getHeaderGHN()
  {
    let headers = new HttpHeaders();
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('token', "d46101be-4c8d-11ed-b824-262f869eb1a7");
  }
  getShippingFeeGHN(data:any)
  {
    let headers=this.getHeaderGHN()
    return this.http.post("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",data, {headers:headers})  
  }
}
