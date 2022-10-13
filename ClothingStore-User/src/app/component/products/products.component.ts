import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SignInComponent } from '../sign-in/sign-in.component';
 
 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, private cartService:CartService, private dialog: MatDialog, private categoryService: CategoryService, private productService: ProductService) { }
  item=[1,2,3,4,5,6]
  allCate:any
  listProduct:any
  isPagination=true;
  listProductOnPage:any
  totalLength:any;
  page:number=1;
 
  ngOnInit(): void {
    
    
    
    this.getData()
  }
  getData()
  {
    this.categoryService.getAllCategory().subscribe(res=>{
       this.allCate=res
      this.allCate=this.allCate.data
      
    })
  }
  getProduct($event :any)
  {
     let id=this.allCate[$event.index].id
    this.productService.getProductByCateId(id).subscribe(res=>{
       this.listProduct=res
      this.listProduct=this.listProduct.data
      this.totalLength=this.listProduct.length
      if(this.listProduct.length<=1) this.isPagination=false
      else this.isPagination=true
    })
  }
  addToCart(id:any)
  {
    if(localStorage.getItem("isLogin")=="true")
    {
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
