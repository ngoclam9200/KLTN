import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { SigninService } from 'src/app/services/signin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  checked = false;
  allProduct: any
  quantity: number
  isLoading=true
  isLogin: boolean = false
  tasks = [{
    completed: true
  },
  { completed: false }]
  constructor(private alertService: AlertService, private signInService: SigninService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("isLogin") == "true") {
      this.isLogin = true

    }

    this.signInService.isLogin.subscribe(res => {
      this.isLogin = true

    })
    this.getData()
  }
  deleteItem() {
    this.alertService.openAlertDelete()

  }
  getData() {
    var userId = localStorage.getItem("userId")
    this.cartService.getAllProductInCart(userId).subscribe(res => {
       this.allProduct = res
      this.allProduct = this.allProduct.data
      for (let i = 0; i < this.allProduct.length; i++) {
        this.allProduct[i].checked = false
        if (this.allProduct[i].product.stock == 1) {
          this.allProduct[i].decreaseProduct = false
          this.allProduct[i].increaseProduct = false
        }
        else if (this.allProduct[i].quantity == 1 && this.allProduct[i].quantity < this.allProduct[i].product.stock) {
          this.allProduct[i].decreaseProduct = false
          this.allProduct[i].increaseProduct = true
        }
        else if (this.allProduct[i].quantity == this.allProduct[i].product.stock) {
          this.allProduct[i].decreaseProduct = true
          this.allProduct[i].increaseProduct = false
        }
        else {
          this.allProduct[i].decreaseProduct = true
          this.allProduct[i].increaseProduct = true
        }
      }
      this.isLoading=false
     })
  }
  increaseProduct(id: any, productId: any) {

    var data = {
      id: id,
      productId: productId
    }
     this.cartService.increaseProduct(data).subscribe(res => {
       this.getData()
    })
  }
  decreaseProduct(id: any, productId: any) {
    var data = {
      id: id,
      productId: productId
    }
    this.cartService.decreaseProduct(data).subscribe(res => {
       this.getData()
    })
  }
  deleteCart(id: any) {
    this.cartService.deleteCart(id).subscribe(res => {
       this.cartService.getCountProductInCart(localStorage.getItem("userId")).subscribe(res => {
        this.signInService.countProductInCart.emit(res)
      })
      this.getData()

    })
  }
  continueBuy() {
    this.router.navigate(['/products'])
  }
  deleteAllCart() {
    var userId = localStorage.getItem("userId")
    this.cartService.deleteAllCart(userId).subscribe(res => {
       this.cartService.getCountProductInCart(localStorage.getItem("userId")).subscribe(res => {
        this.signInService.countProductInCart.emit(res)
      })
      this.getData()
    })
  }
  buy(idCart: any) {
    this.router.navigate(['./checkout/' + idCart])
  }
  buyChecked() {
    var listProductId = ""
    for (let i = 0; i < this.allProduct.length; i++) {
      if (this.allProduct[i].checked == true) {
        if (listProductId == "")
          listProductId = this.allProduct[i].id
        else listProductId += "&" + this.allProduct[i].id
      }
    }
     if (listProductId == "") {
      Swal.fire({
        title: 'Vui lòng chọn sản phẩm',
        text: "Bạn chưa chọn sản phẩm để mua",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
    else {
      this.buy(listProductId)
    }


  }

}
