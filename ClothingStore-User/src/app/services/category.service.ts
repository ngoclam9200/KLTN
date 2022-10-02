import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl=environment.apiUrl+"/Category"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getAllCategory()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-category", {headers:headers})
  }
  
  
   
  
  searchCategory(category:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-category-by-name/"+category, {headers:headers})
  }
}
