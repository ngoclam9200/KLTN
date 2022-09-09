import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UpdateAddressComponent } from './update-address/update-address.component';
@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.css']
})
export class ChangeAddressComponent implements OnInit {
  tasks = [{
    completed: true
  },
  { completed: false }]
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  updateAddress()
  {
    this.dialog.closeAll()
    this.dialog.open(UpdateAddressComponent, {
      width: '700px',
      height: '548px,'
    })
    

  }
  

}
