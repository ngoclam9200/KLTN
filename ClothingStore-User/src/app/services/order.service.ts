import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl=environment.apiUrl+"/Order"
   
  isCheckout = new EventEmitter();
   dataCheckout:any
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  createOrder(data:any)
  {
    let headers=this.getHeader()
    return this.http.post(this.apiUrl+ "/create-order", data, {headers:headers})
  }
  getOrderWaitConfirm(id:any)
  {
    let header=this.getHeader()
    return this.http.get(this.apiUrl+ "/get-all-waitconfirm-order/"+id, {headers:header})
  }
  getOrderDelivering(id:any)
  {
    let header=this.getHeader()
    return this.http.get(this.apiUrl+ "/get-all-delivering-order/"+id, {headers:header})
  }
  getOrderDelivered(id:any)
  {
    let header=this.getHeader()
    return this.http.get(this.apiUrl+ "/get-all-delivered-order/"+id, {headers:header})
  }
  getOrderCancle(id:any)
  {
    let header=this.getHeader()
    return this.http.get(this.apiUrl+ "/get-all-cancle-order/"+id, {headers:header})
  }
  paymentPayPal(data:any)
  {
    
    let header=this.getHeader()
    return this.http.post(this.apiUrl+ "/PaymentPaypal/",data, {headers:header})
  }
  paymentVnPay(data:any)
  {
    
    let header=this.getHeader()
    return this.http.post(this.apiUrl+ "/paymentVnPay/",data, {headers:header})
  }
  checkoutPaypal(data:any)
  {
    this.isCheckout.emit(true)
    let header=this.getHeader()
    return this.http.post(this.apiUrl+ "/CheckoutPaypal/",data, {headers:header})
  }
  checkoutVnPay(data:any)
  {
    let header=this.getHeader()
    return this.http.post(this.apiUrl+ "/checkout-paymentVnPay/",data, {headers:header})
  }
}
