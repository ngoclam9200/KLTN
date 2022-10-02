import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SignInComponent } from '../sign-in/sign-in.component';
 
 
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private categoryService: CategoryService, private productService: ProductService) { }
  item=[1,2,3,4,5,6]
  allCate:any
  listProduct:any
  isPagination=true;
  listProductOnPage:any
  totalLength:any;
  page:number=1;
 
  ngOnInit(): void {
    
    
    // alert(calcDistance(p1, p2));
    
    //calculates distance between two points in km's
    // function calcDistance(p1, p2) {
    //   return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    // }
    this.getData()
  }
  getData()
  {
    this.categoryService.getAllCategory().subscribe(res=>{
      console.log(res)
      this.allCate=res
      this.allCate=this.allCate.data
      
    })
  }
  getProduct($event :any)
  {
    console.log(this.allCate[$event.index].id)
    let id=this.allCate[$event.index].id
    this.productService.getProductByCateId(id).subscribe(res=>{
      console.log(res)
      this.listProduct=res
      this.listProduct=this.listProduct.data
      this.totalLength=this.listProduct.length
      if(this.listProduct.length<=1) this.isPagination=false
      else this.isPagination=true
    })
  }
  addToCart()
  {
    if(localStorage.getItem("isLogin")=="true")
    {
      this.router.navigate(['product-detail/1'])
    }
    else {
      this.router.navigate(['sign-in'])
    }
  }

}
