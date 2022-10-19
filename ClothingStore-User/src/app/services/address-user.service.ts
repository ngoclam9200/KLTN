import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressUserService {

  apiUrl=environment.apiUrl+"/AddressUser"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getHeaderGHN()
  {
    let headers = new HttpHeaders();
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('token', "d46101be-4c8d-11ed-b824-262f869eb1a7");
  }
  getAllAddressUser(userid:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-address/"+ userid , {headers:headers})
  }
  getAddressDefaultUser(userid:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-address-default/"+ userid , {headers:headers})
  }
  createAddress(data:any)
  {
    let headers=this.getHeader()
    return this.http.post(this.apiUrl+ "/create-address", data, {headers:headers})
  }
  editAddress(data:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+ "/edit-address", data, {headers:headers})
  }
  editAddressDefault(data:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+ "/edit-address-default", data, {headers:headers})
  }
  getAllProvince()
  {
   let headers=this.getHeaderGHN()
   return this.http.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {headers:headers})
  }
  getAllDistrict(data:any)
  {
   let headers=this.getHeaderGHN()
   return this.http.post("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",data, {headers:headers})
  }
  getAllWard(data:any)
  {
   let headers=this.getHeaderGHN()
   return this.http.post("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",data, {headers:headers})
  }
   
  
}
