import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private dialog:MatDialog) { }

  ngOnInit(): void {
   }
  uploadAvatar()
  {
    if(this.imagePreview)
    {
      var data={
        id: this.data.id,
        avatar: this.imagePreview
      }
       this.userService.editAvatarUser(data).subscribe(res=>{
         this.dialog.closeAll()
      })
      
    }
  }

}
