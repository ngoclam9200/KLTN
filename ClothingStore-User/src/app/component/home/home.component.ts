import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource:any
  constructor(private router : Router, private productService : ProductService, private cartService:CartService) { }
 
  ngOnInit(): void {
    this.getLastestProduct()
  }
  getLastestProduct()
  {
    this.productService.getLastestProduct().subscribe(res=>{
      console.log(res)
      this.dataSource=res
      this.dataSource=this.dataSource.data
      
      // console.log(this.dataSource)
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
    console.log(data)
    this.cartService.createCart(data).subscribe(res=>{
      this.router.navigate(['shopping-cart'])
    })

  }
}
