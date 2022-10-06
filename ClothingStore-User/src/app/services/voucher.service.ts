import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  apiUrl=environment.apiUrl+"/Voucher"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  
  searchVoucher(code:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-voucher-by-code/"+code, {headers:headers})
  }

}
