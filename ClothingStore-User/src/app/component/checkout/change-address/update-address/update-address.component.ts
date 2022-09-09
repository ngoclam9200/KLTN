import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAddressComponent } from '../change-address.component';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {

  constructor(private dialog :MatDialog) { }

  ngOnInit(): void {
  }
  openChangeAddressDialog()
  {
    this.dialog.closeAll()
    this.dialog.open(ChangeAddressComponent, {
      width: '700px',
    })
  }

}
