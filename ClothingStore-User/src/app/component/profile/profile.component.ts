import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ValidateService } from 'src/app/services/validate.service';
import Swal from 'sweetalert2';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private validateService: ValidateService, private dialog: MatDialog) { }
  dataUser: any
  isSubmit: boolean = false
  phonenumberValidate: boolean = true;
  formGroup: FormGroup
  isLoading=true
  ngOnInit(): void {
    this.initForm()
    this.getData()
  }
  getData() {
    this.userService.getUserById(localStorage.getItem("userId")).subscribe(res => {
      this.dataUser = res
      this.dataUser = this.dataUser.data
      this.isLoading=false
      this.initForm()
    })
  }
  initForm() {



    this.formGroup = new FormGroup({
      id: new FormControl(localStorage.getItem("userId"), [Validators.required]),
      fullname: new FormControl(this.dataUser?.fullname, [Validators.required]),
      gender: new FormControl(this.dataUser?.gender, [Validators.required]),
      phonenumber: new FormControl(this.dataUser?.phonenumber, [Validators.required])
    });





  }
  editUser() {
    if(this.formGroup.valid)
    {
      Swal.fire({
        title: 'Bạn có chắc chắn muốn thay đổi?',
        text: "Thông tin này sẽ bị thay đổi , bạn không thể hoàn tác!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Chỉnh sửa!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isSubmit = true
          this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)
          if (this.formGroup.valid && this.phonenumberValidate) {
            this.userService.editUser(this.formGroup.value).subscribe(res => {
              Swal.fire(
                'Đã chỉnh sửa!',
                'Thông tin được chỉnh sửa',
                'success'
              )
              this.getData()
            })
          }
  
  
        }
      })
    }
 


  }
  inputPhoneChange()
  {
    
    this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)

  }
  changeAvatar() {
    const dialogRef = this.dialog.open(ChangeAvatarComponent, {
      width: "600px",
      data: this.dataUser
    })
    dialogRef.afterClosed().subscribe(res => {
      this.getData()
    })
  }
  changePassword()
  {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "700px",
      data: this.dataUser
    })
  }
}
