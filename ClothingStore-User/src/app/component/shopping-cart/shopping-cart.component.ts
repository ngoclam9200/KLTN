import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  checked = false;
  allProduct: any
  quantity: number
  tasks = [{
    completed: true
  },
  { completed: false }]
  constructor(private alertService: AlertService, private signInService: SigninService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getData()
  }
  deleteItem() {
    this.alertService.openAlertDelete()

  }
  getData() {
    var userId = localStorage.getItem("userId")
    this.cartService.getAllProductInCart(userId).subscribe(res => {
      console.log(res)
      this.allProduct = res
      this.allProduct = this.allProduct.data
      for (let i = 0; i < this.allProduct.length; i++) {
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
      console.log(this.allProduct)
    })
  }
  increaseProduct(id: any, productId: any) {

    var data = {
      id: id,
      productId: productId
    }
    console.log(data)
    this.cartService.increaseProduct(data).subscribe(res => {
      console.log(res)
      this.getData()
    })
  }
  decreaseProduct(id: any, productId: any) {
    var data = {
      id: id,
      productId: productId
    }
    this.cartService.decreaseProduct(data).subscribe(res => {
      console.log(res)
      this.getData()
    })
  }
  deleteCart(id: any) {
    this.cartService.deleteCart(id).subscribe(res => {
      console.log(res);
      this.cartService.getCountProductInCart(localStorage.getItem("userId")).subscribe(res=>{
        this.signInService.countProductInCart.emit(res)
      })
      this.getData()

    })
  }
  continueBuy()
  {
    this.router.navigate(['/products'])
  }
  deleteAllCart(){
    var userId=localStorage.getItem("userId")
    this.cartService.deleteAllCart(userId).subscribe(res=>
      {
        console.log(res)
        this.cartService.getCountProductInCart(localStorage.getItem("userId")).subscribe(res=>{
          this.signInService.countProductInCart.emit(res)
        })
        this.getData()
      })
  }
  buy(idCart:any)
  {
    this.router.navigate(['./checkout/'+idCart])
  }

}
