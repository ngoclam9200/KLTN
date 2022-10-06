import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formGroup: FormGroup
  constructor(private userService: UserService) { }
  notifi:any
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
      this.formGroup = new FormGroup({
        email: new FormControl("", [Validators.required]),
      });
  }
  sendEmail()
  {
    if(this.formGroup.valid)
    {
      this.userService.forgotPass(this.formGroup.value).subscribe(res=>{
        console.log(res)
        
      })
    }
    
  }

}
