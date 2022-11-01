import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddressUserService } from 'src/app/services/address-user.service';
import {FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  address:any
  
  empty:boolean=false
  allProvince:any
  allDistrict:any
  allWard:any
  Province:any
  District:any
  Ward:any
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  threeFormGroup = this.formBuilder.group({
    threeCtrl: ['', Validators.required],
  });
  fourFormGroup = this.formBuilder.group({
    four1Ctrl: ['', Validators.required],
    four2Ctrl: ['', Validators.required],
  });
  isEditable = false;
   
  constructor(@Inject(DOCUMENT) private document: Document,private formBuilder: FormBuilder,
   private addressService: AddressUserService, private dialog:MatDialog,public dialogRef: MatDialogRef<AddAddressComponent>) { }

  ngOnInit(): void {

    // this.createScript()
   
    
    this.addressService.getAllProvince().subscribe(res=>{
       this.allProvince=res
      this.allProvince=this.allProvince.data
      
    })
    
  }
  getAddress()
  { this.address=this.fourFormGroup.controls['four1Ctrl'].value + ", "
     + this.fourFormGroup.controls['four2Ctrl'].value + ", "
    +  this.Ward +", "
    +  this.District+", "
    +  this.Province 
    
   
  }
  getDistrict(event:any)
  {
    var data={
      province_id : event.value
    }
     for(let i=0 ; i<this.allProvince.length ; i++)
    {
      if(this.allProvince[i].ProvinceID==event.value)
      {
        this.Province=this.allProvince[i].ProvinceName
        break
      }
    }
    
    this.addressService.getAllDistrict(data).subscribe(res=>{
       this.allDistrict=res
      this.allDistrict=this.allDistrict.data
    
    
      this.secondFormGroup.controls['secondCtrl'].setValue(undefined)
      this.threeFormGroup.controls['threeCtrl'].setValue(undefined)
      this.fourFormGroup.controls['four1Ctrl'].setValue(undefined)
      this.fourFormGroup.controls['four2Ctrl'].setValue(undefined)
     })
    
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
       this.allWard=res
      this.allWard=this.allWard.data
    })

  }
  getWardChange(event:any)
  {
    for(let i=0 ; i<this.allWard.length ; i++)
    {
      if(this.allWard[i].WardCode==event.value)
      {
        this.Ward=this.allWard[i].WardName
        break
      }
    }
  }
  addAddress() {
    
     
    const data:any={
      userId: localStorage.getItem("userId"),
      address: this.address,
      provinceID: this.firstFormGroup.controls['firstCtrl'].value,
      districtId: this.secondFormGroup.controls['secondCtrl'].value,
      wardCode: this.threeFormGroup.controls['threeCtrl'].value,



      
    }
     
    this.addressService.createAddress(data).subscribe(res=>{
       this.dialogRef.close()
       
    })
 
  }
  // createScript() {
   
  //   var script = document.createElement('script');
  //   script.onload = function () {

  //     var autocomplete = new google.maps.places.Autocomplete((<HTMLInputElement>document.getElementById('search_input')), {
  //       types: ['geocode'],
  //       componentRestrictions: {
  //         country: "VN"
  //       }
  //     });
  //     google.maps.event.addListener(autocomplete, 'place_changed',  () => {
  //       var near_place: any
  //       near_place = autocomplete.getPlace();
    
       
  //       var lat = <HTMLInputElement>document.getElementById("lat");
  //       lat.value =near_place.geometry.location.lat() ;
  //       var lng = <HTMLInputElement>document.getElementById("lng");
  //       lng.value =near_place.geometry.location.lng() ;
    
        
        
  //     });
      
  //   };

  //   script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyD200lnScujHpgwiEbf-oaX8ZbHXIJ_SUE";


  //   document.getElementsByTagName('head')[0].appendChild(script);
  // }





}
