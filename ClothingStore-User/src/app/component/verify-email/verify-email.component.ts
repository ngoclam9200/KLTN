import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  token: any
  decodeToken: any
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.decodeToken = jwt_decode(this.token)
       var data={
        email: this.decodeToken.email.trim()
      }
      this.userService.verifyEmail(data).subscribe(res => {
         Swal.fire(
          'Đã xác thực  !',
          'Xác thực tài khoản thành công.',
          'success'
        )
      })
   
    });


  }

}
