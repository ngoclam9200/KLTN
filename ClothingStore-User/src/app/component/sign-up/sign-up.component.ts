import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ValidateService } from 'src/app/services/validate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formGroup: FormGroup
  phonenumberValidate: boolean = true;
  usernameValidate: boolean = true;
  errorRes:any
  emailExist:boolean=true
  usernameExist:boolean=true
  emailValidate: boolean = true
  passwordValidate: boolean = true
  isconfirmpassword: boolean=true
  confirmpass:string=""
  Gender: any = ""
  isSubmit:boolean=false
  isLoading:boolean=false
  constructor(private validateService : ValidateService, private userService:UserService, private router :Router) { }

  ngOnInit(): void {
    this.initForm()
  }
  inputEmailChange()
  {
    this.emailValidate = this.validateService.ValidateEmail(this.formGroup.controls['email'].value)
  }
  inputPhoneNumberChange()
  {
    this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)

  }
  inputUsernameChange()
  {
    this.usernameValidate=this.validateService.validateUsername(this.formGroup.controls['username'].value)
  }
  inputPassChange()
  {
    this.passwordValidate=this.validateService.ValidatePassword(this.formGroup.controls['password'].value)

  }
  inputConfPassChange()
  {
    this.isconfirmpassword=this.validateService.confirmPassw(this.formGroup.controls['password'].value,this.confirmpass)

  }
  initForm() {
     
      this.formGroup = new FormGroup({
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
        fullname: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        phonenumber: new FormControl(null, [Validators.required])
      });
  
  }
  registerUser()
  {

    this.emailExist=true
   this.usernameExist=true
    this.isSubmit=true
    this.emailValidate = this.validateService.ValidateEmail(this.formGroup.controls['email'].value)
    this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)
    this.usernameValidate=this.validateService.validateUsername(this.formGroup.controls['username'].value)
    
   
    this.passwordValidate=this.validateService.ValidatePassword(this.formGroup.controls['password'].value)
    if(this.passwordValidate  )
    {
      
      this.isconfirmpassword=this.validateService.confirmPassw(this.formGroup.controls['password'].value,this.confirmpass)
    }
    if(this.emailValidate && this.phonenumberValidate && this.usernameValidate && this.isconfirmpassword && this.passwordValidate)
    {
      this.isLoading=true
      this.userService.registerUser(this.formGroup.value).subscribe(res=>
        {
          this.isLoading=false
          Swal.fire({
            title: 'Đăng kí tài khoản thành công',
            text: "Vui lòng check mail để xác thực email",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.initForm()
               this.router.navigate(['/sign-in'])
            }
          })
        
        },
        err=>{
          this.isLoading=false
           this.errorRes=err
          this.errorRes=this.errorRes.error.message
           
          if(this.errorRes=="Email đã tồn tại, vui lòng thử email khác") this.emailExist=false
          if(this.errorRes=="Tên đăng nhập đã tồn tại, vui lòng thử tên khác") this.usernameExist=false
        })
    }

  }

}
