import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl=environment.apiUrl+"/Cart"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getAllProductInCart(userid:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-product-in-cart/"+ userid , {headers:headers})
  }
  createCart(data:any)
  {
    let headers=this.getHeader()
    return this.http.post(this.apiUrl+ "/create-cart", data, {headers:headers})
  }
  increaseProduct(quantity:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+ "/increase-product", quantity, {headers:headers})
  }
  changeSizeProduct(data:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+ "/change-size-product", data, {headers:headers})
  }
  decreaseProduct(quantity:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+ "/decrease-product", quantity, {headers:headers})
  }
  deleteCart(id:any)
  {
    let headers=this.getHeader()
    return this.http.delete(this.apiUrl+ "/delete-cart/"+ id, {headers:headers})
  }
  deleteAllCart(userid:any)
  {
    let headers=this.getHeader()
    return this.http.delete(this.apiUrl+ "/delete-all-cart/"+ userid, {headers:headers})
  }
  getCartById(id:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+ "/get-cart-by-id/"+ id, {headers:headers})
  }
  getCountProductInCart(userid:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-count-product-in-cart/"+ userid , {headers:headers})
  }
  
  
   
  
  
}
