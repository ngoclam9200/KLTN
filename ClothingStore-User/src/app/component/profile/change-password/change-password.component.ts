import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ValidateService } from 'src/app/services/validate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private validateService: ValidateService, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService
   , private dialog: MatDialog) { }
  formGroup: FormGroup;
  passwordValidate: boolean = true
  isconfirmpassword: boolean = true
  isSubmit: boolean = false
  errText:any
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {

    this.formGroup = new FormGroup({
      id: new FormControl(this.data.id, [Validators.required]),
      oldPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
      confirmNewPassword: new FormControl("", [Validators.required]),
    });




  }
  inputPassChange() {
    this.passwordValidate = this.validateService.ValidatePassword(this.formGroup.controls['newPassword'].value)

  }
  inputConfPassChange() {
    this.isconfirmpassword = this.validateService.confirmPassw(this.formGroup.controls['newPassword'].value, this.formGroup.controls['confirmNewPassword'].value)

  }
  changePassword() {
    this.isSubmit = true
    if (this.formGroup.valid && this.isconfirmpassword && this.passwordValidate) {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn thay đổi mật khẩu?',
        text: "Mật khẩu sẽ bị thay đổi , bạn không thể hoàn tác!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Thay đổi'
      }).then((result) => {
        if (result.isConfirmed) {
          
            this.userService.changePass(this.formGroup.value).subscribe(res => {
                Swal.fire(
                  'Đã chỉnh sửa!',
                  'Mật khẩu được chỉnh sửa',
                  'success'
                )
                this.dialog.closeAll()
              },err=>{
              
                this.errText=err
                this.errText=this.errText.error.message
              }
            )
          
         
        }
      })
    }
  }

}
