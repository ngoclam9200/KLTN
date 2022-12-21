import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  constructor(private userService: UserService) { }
  formGroup: FormGroup;
  isSubmit = false

  dataUser: any
  ngOnInit(): void {
    this.initForm()

  }
  initForm() {

    this.formGroup = new FormGroup({


      fullname: new FormControl(localStorage.getItem(""), [Validators.required]),

      email: new FormControl(localStorage.getItem(""), [Validators.required]),
      problem: new FormControl("", [Validators.required]),

      content: new FormControl("", [Validators.required]),

    });


  }

  sendEmail() {
    this.isSubmit = true

    this.userService.getUserById(localStorage.getItem("userId")).subscribe(res => {
      this.dataUser = res
      this.dataUser = this.dataUser.data
     

      this.formGroup.controls['email'].setValue(this.dataUser.email)
      this.formGroup.controls['fullname'].setValue(this.dataUser.fullname)
     
      if (this.formGroup.valid) {
        this.userService.sendEmail(this.formGroup.value).subscribe(res => {
        })
      }
    })


  }

}
