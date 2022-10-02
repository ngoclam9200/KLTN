import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddressUserService } from 'src/app/services/address-user.service';
import { CartService } from 'src/app/services/cart.service';
import { AddAddressComponent } from './add-address/add-address.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ChangePaymentMethodComponent } from './change-payment-method/change-payment-method.component';
 
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private dialog : MatDialog, private route: ActivatedRoute, private cartService: CartService, private addressService: AddressUserService) { }
  rows:any = [];
  dataCart:any
  address:any;
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
    this.getData()
  }
  getData()
  {
    let id =this.route.snapshot.params.id
    this.cartService.getCartById(id).subscribe(res=>{
      console.log(res)
      this.dataCart=res
      this.dataCart=this.dataCart.data
      
    })
    this.addressService.getAllAddressUser(localStorage.getItem("userId")).subscribe(res=>{
      console.log(res)
      this.address=res
      this.address=this.address.data
    })
  }
  changeAddress()
  {
    this.dialog.open(ChangeAddressComponent, {
      width: '700px',
    })
  }
  addAddress()
  {
    this.dialog.open(AddAddressComponent, {
      width: '700px',
      height :'300px'
      
    })
  }
  changePaymentMethod()
  {
    this.dialog.open(ChangePaymentMethodComponent, {
      width: '700px',
    })
  
  }

}
