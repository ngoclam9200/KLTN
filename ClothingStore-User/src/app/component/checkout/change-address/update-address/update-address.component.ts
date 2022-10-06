import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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
  lat:any
  lng:any
  empty:boolean=false
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,@Inject(DOCUMENT) private document: Document,
   private addressService: AddressUserService, private dialog:MatDialog,
   public dialogRef: MatDialogRef<UpdateAddressComponent>) { }

  ngOnInit(): void {
    var lat = <HTMLInputElement>document.getElementById("lat");
    lat.value=this.data.lat    
    var lng = <HTMLInputElement>document.getElementById("lng");
    lng.value=this.data.lng
    var address = <HTMLInputElement>document.getElementById("search_input");
    address.value=this.data.address
    console.log(address.value)
    this.createScript()
    
  }
  updateAddress() {
    var lat = <HTMLInputElement>document.getElementById("lat");
        
    var lng = <HTMLInputElement>document.getElementById("lng");
    var address = <HTMLInputElement>document.getElementById("search_input");
     
    const data:any={
      userId: localStorage.getItem("userId"),
      address: address.value,
      lat: parseFloat( lat.value),
      lng: parseFloat(lng.value),
      id: this.data.id
    }
    console.log(data)
    
    this.addressService.editAddress(data).subscribe(res=>{
      console.log(res)
      this.dialogRef.close()
    })
 
  }
  createScript() {
   
    var script = document.createElement('script');
    script.onload = function () {

      var autocomplete = new google.maps.places.Autocomplete((<HTMLInputElement>document.getElementById('search_input')), {
        types: ['geocode'],
        componentRestrictions: {
          country: "VN"
        }
      });
      google.maps.event.addListener(autocomplete, 'place_changed',  () => {
        var near_place: any
        near_place = autocomplete.getPlace();
    
       
        var lat = <HTMLInputElement>document.getElementById("lat");
        lat.value =near_place.geometry.location.lat() ;
        var lng = <HTMLInputElement>document.getElementById("lng");
        lng.value =near_place.geometry.location.lng() ;
    
        
        
      });
      
    };

    script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyD200lnScujHpgwiEbf-oaX8ZbHXIJ_SUE";


    document.getElementsByTagName('head')[0].appendChild(script);
  }


  openChangeAddressDialog()
  {
    this.dialog.closeAll()
    this.dialog.open(ChangeAddressComponent, {
      width: '700px',
    })
  }

}
