import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  ValidateEmail(email :any) {

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
       return regex.test(email)
  
  }
  ValidatePassword(password: any)
  {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return passw.test(password)
  }
  validateUsername(username: string)
  {  if(username==null) return false
    if(username.length<8 || username.length>16) return false
    else
    {
      let usernameRegex = new RegExp('[a-z]');
    
      return usernameRegex.test(username);
    }
   

  }
  validatePhoneNumber(phonenumber:any)
  {  
     if(phonenumber==null) return false
     if(phonenumber.length==10) {
      if(phonenumber.charAt(0)=="0") return true
      else return false

     } 
     else 
     {
      return false
     }
    
  }
  confirmPassw(pass:any , confirmPassw:any)
  {
    if(pass==confirmPassw) return true;
    else return false
  }
}
