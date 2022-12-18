import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
allCate:any
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
  }
  goProductPage() {
    this.categoryService.getAllCategory().subscribe(res=>{
      this.allCate=res
      this.allCate=this.allCate.data
      this.router.navigate(['products'], { queryParams: { categoryId: this.allCate[0].id } })
    })
    
  }
  goHomePage() {
    this.router.navigate(['home'])
  }
  goAboutUsPage() {
    this.router.navigate(['about-us'])
  }
   

}
