import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) { }
  item=[1,2,3,4,5,6]
  ngOnInit(): void {
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
