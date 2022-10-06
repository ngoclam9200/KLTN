import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  uploadAvatar()
  {
    if(this.imagePreview)
    {
      var data={
        id: this.data.id,
        avatar: this.imagePreview
      }
      console.log(data);
      this.userService.editAvatarUser(data).subscribe(res=>{
        console.log(res);
        
      })
      
    }
  }

}
