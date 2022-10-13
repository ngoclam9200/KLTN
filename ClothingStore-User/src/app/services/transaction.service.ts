import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

 
  apiUrl=environment.apiUrl+"/Transaction"
 
  constructor( private http: HttpClient ,) { }
  getAllTransaction()
  {
    return this.http.get(this.apiUrl + "/get-all-transaction")
  }
}
