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
    private orderService : OrderService, private router : Router) { }
  rows: any = [];
  dataCart: any
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
  unitPrice: any
  shippingFeeId: any
  message: any=" "
  displayedColumns: string[] = ['ten', 'dongia', 'discount', 'soluong', 'thanhtien'];
  // dataSource:any;
  changePayment = false

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    let id = this.route.snapshot.params.id
    this.cartService.getCartById(id).subscribe(res => {
      console.log(res)
      this.dataCart = res
      this.dataCart = this.dataCart.data
      this.total = this.dataCart[0].product.price -
        this.dataCart[0].product.price * this.dataCart[0].product.discount / 100

    })
    this.addressService.getAddressDefaultUser(localStorage.getItem("userId")).subscribe(res => {
      console.log(res)
      this.addressUser = res
      this.addressUser = this.addressUser.data
      this.infoShopService.getInfoShop().subscribe(res => {
        console.log(res)
        this.addressShop = res
        this.addressShop = this.addressShop.data
        var provinceUser = this.addressUser[0].address.split(",")
        provinceUser = provinceUser[provinceUser.length - 2]
        var provinceShop = this.addressShop[0].address.split(",")
        provinceShop = provinceShop[provinceShop.length - 2]
        if (provinceShop.trim() == provinceUser.trim()) {
          this.shippingfeeService.searchShippingFee("Nội thành").subscribe(res => {
            console.log(res)
            this.shippingfee = res
            this.shippingFeeId = this.shippingfee.data[0]?.id
            this.shippingfee = this.shippingfee.data[0]?.price
            this.feeship = this.shippingfee
            console.log(this.shippingfee)

          })
        }
        else {
          this.shippingfeeService.searchShippingFee("Ngoại thành").subscribe(res => {

            this.shippingfee = res
            this.shippingfee = this.shippingfee.data[0].price

          })
        }
      })
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
      width: '800px',
      height: '300px'

    })
    dialogRef.afterClosed().subscribe(res => {
      this.getData()
    })
  }
  changePaymentMethod() {
    this.dialog.open(ChangePaymentMethodComponent, {
      width: '700px',
    })

  }
  searchVoucher() {
    this.voucherService.searchVoucher(this.codeVoucher).subscribe(res => {
      console.log(res)
      this.discountbyvoucher = res
      this.isCodeVoucher = true
      this.discountbyvoucher = this.discountbyvoucher.data
      if (this.discountbyvoucher[0].discountprice > 0) {
        this.isCodeVoucherPrice = true
        this.isCodeVoucherShip = false
        this.unitPrice = (this.total - this.total * this.discountbyvoucher[0].discountprice / 100) + this.feeship
      }
      else {
        this.isCodeVoucherPrice = false
        this.isCodeVoucherShip = true
        this.unitPrice = this.total + (this.feeship - this.feeship * this.discountbyvoucher[0].discountfreeship / 100)
      }
      console.log(this.total)
    }, err => {

    })
  }
  checkout() {
    var data: any = {
      userId: localStorage.getItem("userId"),
      addressShip: this.addressUser[0]?.address,
      unitPrice: 0,
      shippingFeeId: this.shippingFeeId,
      transactionId: "1",
      statusOrderId: "1",
      productId: this.dataCart[0].product.id,
      quantity: this.dataCart[0].quantity,
      phonenumber: this.dataCart[0].user.phonenumber,
      voucherId: "0",
      message: this.message,
      cartId: this.dataCart[0].id,


    }
    var price = this.dataCart[0].product.price - this.dataCart[0].product.price * this.dataCart[0].product.discount / 100
    if (this.discountbyvoucher?.length > 0) {
      console.log(this.discountbyvoucher)
      data.voucherId = this.discountbyvoucher[0].id

      console.log(price)
      if (this.discountbyvoucher[0].discountfreeship == 0) {
        data.unitPrice = Math.round(this.shippingfee + price - price * this.discountbyvoucher[0].discountprice)
      }
      else {
        console.log(this.shippingfee, price,)
        data.unitPrice = Math.round(price + this.shippingfee - this.shippingfee * this.discountbyvoucher[0].discountfreeship / 100)

      }


    }
    else {
      data.unitPrice = Math.round(this.shippingfee + price)
    }
    console.log(data)
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
        this.orderService.createOrder(data).subscribe(res=>{
          console.log(res)
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
