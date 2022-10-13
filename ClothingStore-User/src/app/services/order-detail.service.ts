import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  apiUrl=environment.apiUrl+"/OrderDetail"
   
  
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
 
  getOrderDetailByOrderId(id:any)
  {
    let header=this.getHeader()
    return this.http.get(this.apiUrl+ "/get-orderdetail-by-orderid/"+id, {headers:header})
  }
}
