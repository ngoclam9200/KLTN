import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddressUserService } from 'src/app/services/address-user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  address:any
  lat:any
  lng:any
  empty:boolean=false
 
  constructor(@Inject(DOCUMENT) private document: Document, private addressService: AddressUserService, private dialog:MatDialog,public dialogRef: MatDialogRef<AddAddressComponent>) { }

  ngOnInit(): void {

    this.createScript()
    
  }
  addAddress() {
    var lat = <HTMLInputElement>document.getElementById("lat");
        
    var lng = <HTMLInputElement>document.getElementById("lng");
    var address = <HTMLInputElement>document.getElementById("search_input");
     
    const data:any={
      userId: localStorage.getItem("userId"),
      address: address.value,
      lat: parseFloat( lat.value),
      lng: parseFloat(lng.value)
    }
    console.log(data)
    
    this.addressService.createAddress(data).subscribe(res=>{
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





}
