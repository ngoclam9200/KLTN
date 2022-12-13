import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private cartService: CartService) { }
  images: any
  currentImage: any
  dataProduct: any
  productDetail: any
  quantity = 1
  isChooseSize = false
  errtext: any
  countProdInSize: any
  size: any
  ngOnInit(): void {

    this.getData()
  }
  getData() {
    let id = this.route.snapshot.params.id;
    this.productService.getAllImageProductById(id).subscribe(res => {
      this.images = res
      this.images = this.images.data

      this.currentImage = this.images[0].url
    })
    this.productService.getProductById(id).subscribe(res => {
      this.dataProduct = res
      this.dataProduct = this.dataProduct.data

      if (!this.dataProduct.isSize) this.isChooseSize = true
      this.productService.getProductDetailById(id).subscribe(res => {
        this.productDetail = res
        this.productDetail = this.productDetail.data
        this.productDetail = this.productDetail[0]

 
      })



    })

  }
  decreasingQuantity() {
    if (this.isChooseSize == false) this.errtext = "Vui lòng chọn size"
    else {
      // if(this.size=="S") var tmpcount=this.productDetail.s
      // if(this.size=="M") var tmpcount=this.productDetail.m
      // if(this.size=="L") var tmpcount=this.productDetail.l
      // if(this.size=="XL") var tmpcount=this.productDetail.xl
      // if(this.size=="XXL") var tmpcount=this.productDetail.xxl


      if (this.quantity != 1) {
        this.quantity--;
      }
    }



  }

  inputquatitychange() {
     if (this.size == "S") var tmpcount = this.productDetail.s
    if (this.size == "M") var tmpcount = this.productDetail.m
    if (this.size == "L") var tmpcount = this.productDetail.l
    if (this.size == "XL") var tmpcount = this.productDetail.xl
    if (this.size == "XXL") var tmpcount = this.productDetail.xxl
    if (this.quantity > tmpcount) this.quantity = tmpcount

  }
  increasingQuantity() {
    if (this.isChooseSize == false) this.errtext = "Vui lòng chọn size"
    else {
      if (this.dataProduct.isSize) {
        if (this.size == "S") var tmpcount = this.productDetail.s
        if (this.size == "M") var tmpcount = this.productDetail.m
        if (this.size == "L") var tmpcount = this.productDetail.l
        if (this.size == "XL") var tmpcount = this.productDetail.xl
        if (this.size == "XXL") var tmpcount = this.productDetail.xxl


        if (this.quantity < tmpcount) {
          this.quantity++;
        }
      }
      else {
        if (this.quantity < this.dataProduct.stock) {
          this.quantity++;
        }
      }
    }
  }
  clickBtnSize($event) {
    this.isChooseSize = true
    this.errtext = ""
    var id = $event.target.id;
    this.size = id
    if (id == "S") {
      this.countProdInSize = this.productDetail.s + " sản phẩm size " + id + " có sẵn"
      document.getElementById($event.target.id).classList.add("product-variation--selected")
      document.getElementById("M").classList.remove("product-variation--selected")
      document.getElementById("L").classList.remove("product-variation--selected")
      document.getElementById("XL").classList.remove("product-variation--selected")
      document.getElementById("XXL").classList.remove("product-variation--selected")
    }
    if (id == "M") {
      this.countProdInSize = this.productDetail.m + " sản phẩm size " + id + " có sẵn"
      document.getElementById($event.target.id).classList.add("product-variation--selected")
      document.getElementById("S").classList.remove("product-variation--selected")
      document.getElementById("L").classList.remove("product-variation--selected")
      document.getElementById("XL").classList.remove("product-variation--selected")
      document.getElementById("XXL").classList.remove("product-variation--selected")
    }
    if (id == "L") {
      this.countProdInSize = this.productDetail.l + " sản phẩm size " + id + " có sẵn"
      document.getElementById($event.target.id).classList.add("product-variation--selected")
      document.getElementById("M").classList.remove("product-variation--selected")
      document.getElementById("S").classList.remove("product-variation--selected")
      document.getElementById("XL").classList.remove("product-variation--selected")
      document.getElementById("XXL").classList.remove("product-variation--selected")
    }
    if (id == "XL") {
      this.countProdInSize = this.productDetail.xl + " sản phẩm size " + id + " có sẵn"
      document.getElementById($event.target.id).classList.add("product-variation--selected")
      document.getElementById("M").classList.remove("product-variation--selected")
      document.getElementById("L").classList.remove("product-variation--selected")
      document.getElementById("S").classList.remove("product-variation--selected")
      document.getElementById("XXL").classList.remove("product-variation--selected")
    }
    if (id == "XXL") {
      this.countProdInSize = this.productDetail.xxl + " sản phẩm size " + id + " có sẵn"
      document.getElementById($event.target.id).classList.add("product-variation--selected")
      document.getElementById("M").classList.remove("product-variation--selected")
      document.getElementById("L").classList.remove("product-variation--selected")
      document.getElementById("XL").classList.remove("product-variation--selected")
      document.getElementById("S").classList.remove("product-variation--selected")
    }




  }
  changeImage(image: any) {
    this.currentImage = image



  }
  addCart() {
    if (localStorage.getItem("isLogin") == "true") {
      if (this.dataProduct.isSize) {
        if (this.size == undefined) this.errtext = "Vui lòng chọn size"
        else {
          var data = {
            productId: this.route.snapshot.params.id,
            userId: localStorage.getItem("userId"),
            quantity: this.quantity,
            size: this.size,
          }

           this.cartService.createCart(data).subscribe(res=>{
            this.router.navigate(['shopping-cart'])
           })
        }

      }
      else
      {
          data = {
          productId: this.route.snapshot.params.id,
          userId: localStorage.getItem("userId"),
          quantity: this.quantity,
          size: "Không",
        }

         this.cartService.createCart(data).subscribe(res=>{
          this.router.navigate(['shopping-cart'])
         })
      }
    }
    
    else {
      this.router.navigate(['sign-in'])
    }


  }
}
