import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
 
  constructor() { }
  images = ["../../../assets/images/product_01.jpg",
    "../../../assets/images/product_02.jpg", 
    "../../../assets/images/product_03.jpg",
    "../../../assets/images/product_04.jpg",
     "../../../assets/images/product_05.jpg", 
    ]
    currentImage:any=this.images[0];
    price=100000
  ngOnInit(): void {

  }
  changeImage(image:any) {
    this.currentImage=image
    console.log(image)


  }
}
