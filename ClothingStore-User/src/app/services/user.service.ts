import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl=environment.apiUrl+"/User"
 
  constructor( private http: HttpClient ,) { }
  forgotPass(email:any)
  {
    return this.http.post(this.apiUrl+"/forgot-password", email)
  }
  registerUser(data:any)
  {
    return this.http.post(this.apiUrl+"/register-user", data)
  }
  verifyEmail(email:any)
  {
    return this.http.put(this.apiUrl+"/verify-email", email)
  }
  getUserById(id:any)
  {
    return this.http.get(this.apiUrl+ "/get-user-by-id/"+ id)
  }
  editUser(data:any)
  {
    return this.http.put(this.apiUrl+ "/edit-profile-user", data)
  }
  editAvatarUser(data:any)
  {
    return this.http.put(this.apiUrl+ "/edit-avatar-user", data)
  }
}
