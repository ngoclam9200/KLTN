import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ValidateService } from 'src/app/services/validate.service';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private validateService: ValidateService, private dialog: MatDialog) { }
 dataUser:any
 isSubmit:boolean=false
 phonenumberValidate: boolean = true;
 formGroup: FormGroup
  ngOnInit(): void {
    this.initForm()
    this.getData()
  }
  getData()
  {
    this.userService.getUserById(localStorage.getItem("userId")).subscribe(res=>{
       this.dataUser=res
      this.dataUser=this.dataUser.data
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
  editUser()
  {
    this.isSubmit=true
    this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)
    if(this.formGroup.valid && this.phonenumberValidate)
    { 

      this.userService.editUser(this.formGroup.value).subscribe(res=>{
        this.getData()
       })
    }
  }
  changeAvatar()
  {
    const dialogRef=this.dialog.open(ChangeAvatarComponent, {
      width:"600px",
      data: this.dataUser
    })
    dialogRef.afterClosed().subscribe(res=>
      {
        this.getData()
      })
  }

}
