import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressUserService } from 'src/app/services/address-user.service';
import { CartService } from 'src/app/services/cart.service';
import { InfoshopService } from 'src/app/services/infoshop.service';
import { OrderService } from 'src/app/services/order.service';
import { ShippingfeeService } from 'src/app/services/shippingfee.service';
import { SigninService } from 'src/app/services/signin.service';
import { VoucherService } from 'src/app/services/voucher.service';
import Swal from 'sweetalert2';
import { AddAddressComponent } from './add-address/add-address.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ChangePaymentMethodComponent } from './change-payment-method/change-payment-method.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private dialog: MatDialog, private route: ActivatedRoute,private signInService: SigninService,
    private cartService: CartService, private addressService: AddressUserService
    , private infoShopService: InfoshopService, private shippingfeeService: ShippingfeeService,
    private voucherService: VoucherService,
    private orderService: OrderService, private router: Router,
  ) {
    this.orderService.isCheckout.subscribe(res => {
    })
  }
  
  dataCart: any = []
  addressUser: any;
  shippingfee: any
  addressShop: any
  discountbyvoucher: any
  codeVoucher: any
  isCodeVoucher: any = false
  isCodeVoucherPrice: any = false
  isCodeVoucherShip: any = false
  total: any
  shippingFeeDiscount:any
  unitPriceDiscount:any
  unitPrice: any = 0
  
  message: any = " "
  transactionName = "Thanh toán khi nhận hàng"
  returnUrl: any
  isLoading= true
  displayedColumns: string[] = ['ten', 'dongia', 'discount', 'soluong', 'thanhtien'];
  // dataSource:any;
  changePayment = false
  data: any

  ngOnInit(): void {
    
    
    this.getData()
  }
  getData() {
    let listid = this.route.snapshot.params.id
    this.unitPrice=0
    var id = listid.split("&")
    this.dataCart = []
    for (let i = 0; i < id.length; i++) {
      this.cartService.getCartById(id[i]).subscribe(res => {
        var datares: any
        datares = res
        datares = datares.data
        this.dataCart.push(datares[0])
        this.unitPrice += (datares[0].product.price - datares[0].product.price * datares[0].product.discount / 100) * datares[0].quantity
        this.unitPriceDiscount=this.unitPrice
      })




    }

    var data :any= {
      service_type_id: 2,
      insurance_value: this.unitPrice,
      coupon: null,
      // from_district_id:this.addressShop.districtID ,
      // to_district_id: this.addressUser.districtID,
      // to_ward_code: this.addressUser.wardCode,
      height: 10,
      length: 20,
      weight: 500,
      width: 20
    }
    this.addressService.getAddressDefaultUser(localStorage.getItem("userId")).subscribe(res => {

      this.addressUser = res
      this.addressUser = this.addressUser.data
       if(this.addressUser.length>0)
      {
        data. to_district_id=this.addressUser[0].districtID
        data.to_ward_code= this.addressUser[0].wardCode
        this.infoShopService.getInfoShop().subscribe(res => {
  
          this.addressShop = res
          this.addressShop = this.addressShop.data
        data.from_district_id=this.addressShop[0].districtID 
           this.shippingfeeService.getShippingFeeGHN(data).subscribe(res=>{
             this.shippingfee=res
            this.shippingfee=this.shippingfee.data.total
            this.shippingFeeDiscount=this.shippingfee
          })
           
        })

      }
      else
      {
        this.addAddress()
      }
      this.isLoading=false
    })
   

  }
 
  changeAddress(data: any) {
    const dialogRef = this.dialog.open(ChangeAddressComponent, {
      width: '800px',
      position: { top: "100px", bottom: "10px" },
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getData()
    })
  }
  addAddress() {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      width: '80%',
      height: '370px'

    })
    dialogRef.afterClosed().subscribe(res => {
      this.getData()
    })
  }
  changePaymentMethod() {
    const dialogRef = this.dialog.open(ChangePaymentMethodComponent, {
      width: '700px',
      data: this.transactionName
    })
    dialogRef.afterClosed().subscribe(result => {
      this.transactionName = result

    });

  }
  searchVoucher() {
    this.unitPriceDiscount=this.unitPrice
    this.shippingFeeDiscount=this.shippingfee
    this.voucherService.searchVoucher(this.codeVoucher).subscribe(res => {
      this.discountbyvoucher = res
      this.isCodeVoucher = true
      this.discountbyvoucher = this.discountbyvoucher.data
      if (this.discountbyvoucher[0].discountprice > 0) {
        this.isCodeVoucherPrice = true
        this.isCodeVoucherShip = false

        this.unitPriceDiscount = (this.unitPrice - this.unitPrice * this.discountbyvoucher[0].discountprice / 100)
      }
      else {
        this.isCodeVoucherPrice = false
        this.isCodeVoucherShip = true
        this.shippingFeeDiscount = this.shippingfee - this.shippingfee * this.discountbyvoucher[0].discountfreeship / 100
      }


    }, err => {

    })
  }
  checkout() {

    var data: any = {
      userId: localStorage.getItem("userId"),
      addressShip: this.addressUser[0]?.address,
      // unitPrice: this.shippingfee + this.unitPrice,
      shippingFee: this.shippingFeeDiscount,
      transactionId: "1",
      statusOrderId: "1",
      listProduct: [],
      quantity: this.dataCart.length,
      phonenumber: this.dataCart[0].user.phonenumber,
      voucherId: "0",
      message: this.message,



    }
    if (this.discountbyvoucher?.length > 0) {

      data.voucherId = this.discountbyvoucher[0].id
      // data.unitPrice = Math.round(this.shippingfee + this.unitPrice)




    }
    for (let i = 0; i < this.dataCart.length; i++) {
      data.listProduct.push({
        productId: this.dataCart[i].product.id,
        productCount: this.dataCart[i].quantity
      })
    }



    if (this.transactionName == "Thanh toán qua Paypal") {
      var url = window.location.origin + "/checkout/"

      var paypal = {
        total: Math.round(this.unitPriceDiscount+this.shippingFeeDiscount),
        returnUrl: url
      }

       
      this.orderService.paymentPayPal(paypal).subscribe(res => {
        this.returnUrl = res
        this.returnUrl = this.returnUrl.data
        window.open(this.returnUrl, "_self");
        data.transactionId = "2"
        localStorage.setItem("dataPayment", JSON.stringify(data))
        localStorage.setItem("currentUrl", location.href)

      })

    }
    else if(this.transactionName == "Thanh toán qua VnPay")
    {
    data.transactionId="3"
     data.bankCode=""
     data.vnpLocale=""
     data.vnp_Returnurl=window.location.origin + "/checkout/"
      this.orderService.paymentVnPay(data).subscribe(res=>{
       this.returnUrl=res
      this.returnUrl = this.returnUrl.data
      window.open(this.returnUrl, "_self");
      localStorage.setItem("dataPayment", JSON.stringify(data))
      localStorage.setItem("transaction","vnpay")
     
      
     })
    }
    else {
       
      Swal.fire({
        title: 'Mua sản phẩm này?',
        text: "Sản phẩm này sẽ không còn trong giỏ hàng!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Mua !'
      }).then((result) => {

        if (result.isConfirmed) {
          this.orderService.createOrder(data).subscribe(res => {
            Swal.fire(
              'Đã mua !',
              'Sản phẩm đã được mua.',
              'success'
            )
            this.router.navigate(['/orders/wait-confirm'])
          })

        }
      })
    }



  }


}
