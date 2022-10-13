import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
 
  constructor(private route : ActivatedRoute, private productService : ProductService, private cartService: CartService) { }
  images :any
    currentImage:any
   dataProduct:any

  ngOnInit(): void {

    this.getData()
  }
  getData()
  {
    let id = this.route.snapshot.params.id;
    this.productService.getAllImageProductById(id).subscribe(res=>{
       this.images=res
      this.images=this.images.data
       
      this.currentImage=this.images[0].url
     })
    this.productService.getProductById(id).subscribe(res=>{
      this.dataProduct=res
      this.dataProduct=this.dataProduct.data
 

    })

  }
  changeImage(image:any) {
    this.currentImage=image
 


  }
  addCart()
  {
    var data={
      productId: this.route.snapshot.params.id,
      userId: localStorage.getItem("userId")
    }
     this.cartService.createCart(data).subscribe(res=>{
     })

  }
}
