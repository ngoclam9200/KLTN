import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressUserService } from 'src/app/services/address-user.service';
import { CartService } from 'src/app/services/cart.service';
import { InfoshopService } from 'src/app/services/infoshop.service';
import { OrderService } from 'src/app/services/order.service';
import { ShippingfeeService } from 'src/app/services/shippingfee.service';
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

  constructor(private dialog: MatDialog, private route: ActivatedRoute,
    private cartService: CartService, private addressService: AddressUserService
    , private infoShopService: InfoshopService, private shippingfeeService: ShippingfeeService,
    private voucherService: VoucherService,
    private orderService: OrderService, private router: Router,
     ) {
      this.orderService.isCheckout.subscribe(res=>{
       })
      }
  rows: any = [];
  dataCart: any=[]
  addressUser: any;
  shippingfee: any
  addressShop: any
  discountbyvoucher: any
  codeVoucher: any
  isCodeVoucher: any = false
  isCodeVoucherPrice: any = false
  isCodeVoucherShip: any = false
  total: any
  feeship: any
  unitPrice: any=0
  shippingFeeId: any
  message: any = " "
  transactionName="Thanh toán khi nhận hàng"
  returnUrl:any
  displayedColumns: string[] = ['ten', 'dongia', 'discount', 'soluong', 'thanhtien'];
  // dataSource:any;
  changePayment = false
  data:any
  ngOnInit(): void {

    this.getData()
  }
  getData() {
    let listid = this.route.snapshot.params.id

    var id = listid.split("&")
     for (let i = 0; i < id.length; i++) {
      this.cartService.getCartById(id[i]).subscribe(res => {
         var datares:any
        datares=res
        datares=datares.data
        this.dataCart.push(datares[0])
         this.unitPrice += ( datares[0].product.price - datares[0].product.price*datares[0].product.discount/100)*datares[0].quantity
        
      })
           
    
    
      
    }
    
   
    this.addressService.getAddressDefaultUser(localStorage.getItem("userId")).subscribe(res => {
      
      this.addressUser = res
      this.addressUser = this.addressUser.data
 
      this.infoShopService.getInfoShop().subscribe(res => {
       
        this.addressShop = res
        this.addressShop = this.addressShop.data
        var provinceUser = this.addressUser[0].address.split(",")
        provinceUser = provinceUser[provinceUser.length - 2]
        var provinceShop = this.addressShop[0].address.split(",")
        provinceShop = provinceShop[provinceShop.length - 2]
        if (provinceShop.trim() == provinceUser.trim()) {
          this.shippingfeeService.searchShippingFee("Nội thành").subscribe(res => {
           
            this.shippingfee = res
            this.shippingFeeId = this.shippingfee.data[0]?.id
            this.shippingfee = this.shippingfee.data[0]?.price
           
           
         

          })
        }
        else {
          this.shippingfeeService.searchShippingFee("Ngoại thành").subscribe(res => {

            this.shippingfee = res
            this.shippingfee = this.shippingfee.data[0].price
            this.total=this.unitPrice+this.shippingfee
          })
        }
      })
    })
    for (let i = 0; i < this.dataCart.length; i++) {
 
     }
    
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
      width: '800px',
      height: '300px'

    })
    dialogRef.afterClosed().subscribe(res => {
      this.getData()
    })
  }
  changePaymentMethod() {
   const dialogRef= this.dialog.open(ChangePaymentMethodComponent, {
      width: '700px',
      data: this.transactionName
    })
    dialogRef.afterClosed().subscribe(result => {
      this.transactionName=result
     
    });

  }
  searchVoucher() {
    this.voucherService.searchVoucher(this.codeVoucher).subscribe(res => {
       this.discountbyvoucher = res
      this.isCodeVoucher = true
      this.discountbyvoucher = this.discountbyvoucher.data
      if (this.discountbyvoucher[0].discountprice > 0) {
        this.isCodeVoucherPrice = true
        this.isCodeVoucherShip = false

        this.unitPrice = (this.unitPrice - this.unitPrice * this.discountbyvoucher[0].discountprice / 100)
      }
      else {
        this.isCodeVoucherPrice = false
        this.isCodeVoucherShip = true
         this.shippingfee=this.shippingfee-this.shippingfee*this.discountbyvoucher[0].discountfreeship / 100
       }
      
      
    }, err => {

    })
  }
  checkout() {
    
    var data: any = {
      userId: localStorage.getItem("userId"),
      addressShip: this.addressUser[0]?.address,
      unitPrice: this.shippingfee+ this.unitPrice,
      shippingFeeId: this.shippingFeeId,
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
      data.unitPrice = Math.round(this.shippingfee + this.unitPrice)
      
      


    }
    for(let i=0 ; i<this.dataCart.length ;i++)
    {
      data.listProduct.push({
        productId:this.dataCart[i].product.id,
        productCount: this.dataCart[i].quantity
      })
    }
     
    

    if(this.transactionName=="Thanh toán qua Paypal")
    {
      var url=window.location.origin + "/checkout/"
       
      var paypal={
        total:  ( data.unitPrice),
        returnUrl:url
      }

       
      this.orderService.paymentPayPal(paypal).subscribe(res=>
        {
           this.returnUrl=res
          this.returnUrl=this.returnUrl.data
          window.open(this.returnUrl, "_self");
          data.transactionId="2"
           localStorage.setItem("dataPayment",JSON.stringify(data))
           localStorage.setItem("currentUrl", location.href)
          
        })
      
    }
    else
    {
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
            this.router.navigate(['/orders'])
          })
  
        }
      })
    }
    


  }


}
