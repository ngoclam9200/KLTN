import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.scss']
})
export class ChangeAvatarComponent implements OnInit {
  selectedFile: File;
  imagePreview: any
  isChooseImage: boolean = true
  errorRes: any;
  nameExist: boolean = true;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
    this.isChooseImage = false
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  uploadAvatar() {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn thay đổi ảnh đại diện?',
      text: "Ảnh sẽ bị thay đổi , bạn không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chỉnh sửa!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.imagePreview) {
          var data = {
            id: this.data.id,
            avatar: this.imagePreview
          }
          this.userService.editAvatarUser(data)
          this.userService.avatar.subscribe(res=>{
            Swal.fire(
                  'Đã chỉnh sửa!',
                  'Thông tin được chỉnh sửa',
                  'success'
                )
                this.dialog.closeAll()
          })
          // .subscribe(res => {
          //   Swal.fire(
          //     'Đã chỉnh sửa!',
          //     'Thông tin được chỉnh sửa',
          //     'success'
          //   )
          //   this.dialog.closeAll()
          // })

        }



      }
    })

  }

}
