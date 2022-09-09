import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ChangePaymentMethodComponent } from './change-payment-method/change-payment-method.component';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private dialog : MatDialog) { }
  rows:any = [];
  displayedColumns: string[] = ['ten', 'dongia', 'soluong', 'thanhtien'];
  // dataSource:any;
  changePayment=false
  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
   
  ];
  ngOnInit(): void {
  }
  changeAddress()
  {
    this.dialog.open(ChangeAddressComponent, {
      width: '700px',
    })
  }
  changePaymentMethod()
  {
    this.dialog.open(ChangePaymentMethodComponent, {
      width: '700px',
    })
  
  }

}
