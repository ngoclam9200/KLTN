import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource:any
  isLoading:boolean=true
  isLogin:boolean=false
  constructor(private router : Router, private productService : ProductService,
     private cartService:CartService, private signInService:SigninService) { }
 
  ngOnInit(): void {
    this.getLastestProduct()
    if(localStorage.getItem("isLogin")=="true")
    
    {
      this.isLogin=true
     
    }
    
    this.signInService.isLogin.subscribe(res=>{
      this.isLogin=true
     
    })
  }
  getLastestProduct()
  {
    this.productService.getLastestProduct().subscribe(res=>{
       this.dataSource=res
      this.dataSource=this.dataSource.data
      this.isLoading=false
     })
  }
  addToCart(id:any)
  {
    if(localStorage.getItem("isLogin")=="true")
    {
      // this.router.navigate(['product-detail/'+ id])
      this.addCart(id)
    }
    else {
      this.router.navigate(['sign-in'])
    }
  }
  addCart(productId:any)
  {
    var data={
      productId: productId,
      userId: localStorage.getItem("userId")
    }
     this.cartService.createCart(data).subscribe(res=>{
      this.router.navigate(['shopping-cart'])
    })

  }
}
