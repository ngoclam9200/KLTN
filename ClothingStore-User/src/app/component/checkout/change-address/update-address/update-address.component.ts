import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressUserService } from 'src/app/services/address-user.service';
import { ChangeAddressComponent } from '../change-address.component';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {
  address:any
  
  empty:boolean=false
  allProvince:any
  allDistrict:any
  allWard:any
  Province:any
  District:any
  Ward:any
  street:any=""
  sonha:any=""
  firstFormGroup = this.formBuilder.group({
    firstCtrl: [this.data.provinceID, Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: [this.data.districtID, Validators.required],
  });
  threeFormGroup = this.formBuilder.group({
    threeCtrl: [this.data.wardCode, Validators.required],
  });
  fourFormGroup = this.formBuilder.group({
    four1Ctrl: [this.sonha, Validators.required],
    four2Ctrl: [this.street, Validators.required],
  });
  isEditable = false;
   
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,@Inject(DOCUMENT) private document: Document,private formBuilder: FormBuilder,
   private addressService: AddressUserService, private dialog:MatDialog,
   public dialogRef: MatDialogRef<UpdateAddressComponent>) { }

  ngOnInit(): void {
    console.log(this.data.address)
    let tmp:any=this.data.address.split(",")
   
    
    this.sonha=tmp[0]
    this.street=tmp[1]
    this.fourFormGroup.controls['four1Ctrl'].setValue(this.sonha)
    this.fourFormGroup.controls['four2Ctrl'].setValue(this.street)
    this.addressService.getAllProvince().subscribe(res=>{
      console.log(res);
      this.allProvince=res
      this.allProvince=this.allProvince.data 
      var data={
        province_id :  this.data.provinceID
      }

      this.addressService.getAllDistrict(data ).subscribe(res=>{
        
        this.allDistrict=res
        this.allDistrict=this.allDistrict.data
        var datadistrict={
          district_id :  this.data.districtID
        }
        this.addressService.getAllWard(datadistrict).subscribe(res=>{
          console.log(res)
          this.allWard=res
          this.allWard=this.allWard.data
          
        })
       
      })
     
      
    })
    
  }
  getAddress()

  { 
    for(let i=0 ; i<this.allProvince.length ; i++)
    {
      if(this.allProvince[i].ProvinceID==this.data.provinceID)
      {
        this.Province=this.allProvince[i].ProvinceName
        break
      }
    }
    for(let i=0 ; i<this.allWard.length ; i++)
    {
      if(this.allWard[i].WardCode==this.data.wardCode)
      {
        this.Ward=this.allWard[i].WardName
        break
      }
    }
    for(let i=0 ; i<this.allDistrict.length ; i++)
    {
      if(this.allDistrict[i].DistrictID==this.data.districtID)
      {
        this.District=this.allDistrict[i].DistrictName
        break
      }
    }

    this.address=this.fourFormGroup.controls['four1Ctrl'].value + ", "
     + this.fourFormGroup.controls['four2Ctrl'].value + ", "
    +  this.Ward +", "
    +  this.District+", "
    +  this.Province 
    
   
  }
  getWard(event:any)
  {
    var data={
      district_id : event.value
    }
    for(let i=0 ; i<this.allDistrict.length ; i++)
    {
      if(this.allDistrict[i].DistrictID==event.value)
      {
        this.District=this.allDistrict[i].DistrictName
        break
      }
    }
    this.addressService.getAllWard(data).subscribe(res=>{
      console.log(res)
      this.allWard=res
      this.allWard=this.allWard.data
    })

  }
  getDistrict(event:any)
  {
    var data={
      province_id : event.value
    }
    this.data.provinceID=event.value
    console.log(event);
    for(let i=0 ; i<this.allProvince.length ; i++)
    {
      if(this.allProvince[i].ProvinceID==event.value)
      {
        this.Province=this.allProvince[i].ProvinceName
        break
      }
    }
    
    this.addressService.getAllDistrict(data).subscribe(res=>{
      console.log(res)
      this.allDistrict=res
      this.allDistrict=this.allDistrict.data
    
    
      this.secondFormGroup.controls['secondCtrl'].setValue(undefined)
      this.threeFormGroup.controls['threeCtrl'].setValue(undefined)
      this.fourFormGroup.controls['four1Ctrl'].setValue(undefined)
      this.fourFormGroup.controls['four2Ctrl'].setValue(undefined)
      console.log(this.secondFormGroup.controls['secondCtrl'].value)
    })
    
  }
  getWardChange(event:any)
  {
    this.fourFormGroup.controls['four1Ctrl'].setValue("")
    this.fourFormGroup.controls['four2Ctrl'].setValue("")
    for(let i=0 ; i<this.allWard.length ; i++)
    {
      if(this.allWard[i].WardCode==event.value)
      {
        this.Ward=this.allWard[i].WardName
        break
      }
    }
  }
 
 

  updateAddress() {
 
     
    const data:any={
      id: this.data.id,
      address: this.address,
      provinceID: this.firstFormGroup.controls['firstCtrl'].value,
      districtId: this.secondFormGroup.controls['secondCtrl'].value,
      wardCode: this.threeFormGroup.controls['threeCtrl'].value,



      
    }
     
    this.addressService.editAddress(data).subscribe(res=>{
       this.dialogRef.close()
    })
 
  }
  


  openChangeAddressDialog()
  {
    this.dialog.closeAll()
    this.dialog.open(ChangeAddressComponent, {
      width: '700px',
    })
  }

}
