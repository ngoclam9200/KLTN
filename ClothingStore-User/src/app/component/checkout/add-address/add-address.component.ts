import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    var script = document.createElement('script');
    script.onload = function () {
       
      var autocomplete = new google.maps.places.Autocomplete((<HTMLInputElement>document.getElementById('search_input')), {
          types: ['geocode'],
          componentRestrictions: {
              country: "VN"
          }
      });
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var near_place:any
         near_place = autocomplete.getPlace();
          console.log(near_place.geometry.location.lat())
      });
    };
    script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg";
    // script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyD200lnScujHpgwiEbf-oaX8ZbHXIJ_SUE";

    // script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);
    
  }





}
