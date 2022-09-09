import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router : Router) { }
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
