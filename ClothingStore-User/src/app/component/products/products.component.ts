import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SigninService } from 'src/app/services/signin.service';
import { SignInComponent } from '../sign-in/sign-in.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, private signInService: SigninService,private route: ActivatedRoute,
    private cartService: CartService, private dialog: MatDialog, private categoryService: CategoryService, private productService: ProductService) { }
  item = [1, 2, 3, 4, 5, 6]
  allCate: any
  idCategory: any
  listProduct: any
  isPagination = true;
  listProductOnPage: any
  totalLength: any;
  page: number = 1;
  isLogin: boolean = false
  search: any = "";
  notfound=false
  isSearch=false
  id:any

  ngOnInit(): void {
    if (localStorage.getItem("isLogin") == "true") {
      this.isLogin = true

    }

    this.signInService.isLogin.subscribe(res => {
      this.isLogin = true

    })


    this.getData()
  }
  getData() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.allCate = res
      this.allCate = this.allCate.data
      // this.idCategory=this.route.snapshot.paramMap.get('categoryId');
      this.route.queryParams.subscribe(param=>{
         this.idCategory=param['categoryId']

        
      })
      for(let i =0 ; i <this.allCate.length;i++)
      {
        if (this.idCategory==this.allCate[i].id)
        this.id=i
      }
      
      this.productService.getProductByCateId(this.idCategory).subscribe(res => {
         
        this.listProduct = res
        this.listProduct = this.listProduct.data
        this.totalLength = this.listProduct.length
        if (this.listProduct.length < 1) this.isPagination = false
        else this.isPagination = true
      })
      
    })
  }

  getProduct($event: any) {
 
    this.isSearch=false
    this.search=""
    this.notfound=false
    let id = this.allCate[$event.index].id
    this.idCategory = id
    this.router.navigate(['products'], { queryParams: { categoryId: this.idCategory } })
     
    
    this.productService.getProductByCateId(id).subscribe(res => {
       
      this.listProduct = res
      this.listProduct = this.listProduct.data
      this.totalLength = this.listProduct.length
      if (this.listProduct.length < 1) this.isPagination = false
      else this.isPagination = true
    })
  }
  addToCart(id: any) {
    if (localStorage.getItem("isLogin") == "true") {
      this.addCart(id)
    }
    else {
      this.router.navigate(['sign-in'])
    }
  }
  addCart(productId: any) {
    var data = {
      productId: productId,
      userId: localStorage.getItem("userId")
    }
    this.cartService.createCart(data).subscribe(res => {
      this.router.navigate(['shopping-cart'])
    })

  }
  searchProduct() {
    if (this.search != "") {
      
       this.productService.searchProductInCategory(this.idCategory, this.search).subscribe(res => {
         this.listProduct = res
        this.listProduct = this.listProduct.data
        if(this.listProduct!=null)
        {
          this.totalLength = this.listProduct.length
          this.isPagination = true
  
        }
        else 
        {
          this.notfound=true
          this.isPagination = false
          
        }
       
      })
    }
    else {
      this.productService.getProductByCateId(this.idCategory).subscribe(res => {
        this.listProduct = res
        this.listProduct = this.listProduct.data
        if(this.listProduct!=null)
        {
          this.totalLength = this.listProduct.length
          if (this.listProduct.length < 1) this.isPagination = false
          else this.isPagination = true
  
        }

        // this.totalLength = this.listProduct.length
        // // this.notfound=false
        // if (this.listProduct.length <= 1) this.isPagination = false
        // else this.isPagination = true
      })
    }
  }
  onChangeTextSearchEvent() {
    this.isSearch=true
    if(this.search!="")
    {
      this.productService.searchProductInCategory(this.idCategory, this.search).subscribe(res => {
         this.listProduct = res
        this.listProduct = this.listProduct.data
        if(this.listProduct!=null)
        {
          this.totalLength = this.listProduct.length
          if (this.listProduct.length < 1) this.isPagination = false
          else this.isPagination = true
  
        }
       

      })
    }
    else
    {
      this.productService.getProductByCateId(this.idCategory).subscribe(res => {
        this.listProduct = res
        this.listProduct = this.listProduct.data
        if(this.listProduct!=null)
        {
           this.notfound=false
          this.totalLength = this.listProduct.length
          if (this.listProduct.length < 1) this.isPagination = false
          else this.isPagination = true
  
        }
       
        // this.totalLength = this.listProduct.length
        // // this.notfound=false
        // if (this.listProduct.length <= 1) this.isPagination = false
        // else this.isPagination = true
      })
    }
  }
}
