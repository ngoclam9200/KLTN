import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QrcodePaymentComponent } from './qrcode-payment/qrcode-payment.component';

@Component({
  selector: 'app-change-payment-method',
  templateUrl: './change-payment-method.component.html',
  styleUrls: ['./change-payment-method.component.css']
})
export class ChangePaymentMethodComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  paymentByMoMo()
  {
    this.dialog.closeAll()
    this.dialog.open(QrcodePaymentComponent, {
      width: '700px',
       
    })
  }
  paymentByPayPal()
  {
    this.dialog.closeAll()
    this.dialog.open(QrcodePaymentComponent, {
      width: '700px',
     
    })
  }
}
