import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl=environment.apiUrl+"/Product"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getAllProduct()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-product", {headers:headers})
  }
  
  getLastestProduct()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-lastest-product", {headers:headers})
  }
  getAllImageProductById(id:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-image-by-id/"+id, {headers:headers})
  }
  getProductById(id:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-product-by-id/"+id, {headers:headers})
  }
  getProductDetailById(id:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-product-detail-by-product-id/"+id, {headers:headers})
  }
  getProductByCateId(id:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-product-by-cateid/"+id, {headers:headers})
  }
  
   
 
  searchProduct(prod:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-product-by-name/"+prod, {headers:headers})
  }
  searchProductInCategory (categoryid, name)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-product-in-category/"+categoryid + "/"+name, {headers:headers})
  }
}
