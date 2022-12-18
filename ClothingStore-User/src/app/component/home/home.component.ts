import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: any
  isLoading: boolean = true
  isLogin: boolean = false
  allvoucher:any
  idCode:any
  allCate:any
  constructor(private router: Router, private productService: ProductService,private categoryService:CategoryService,
    private cartService: CartService, private signInService: SigninService) { }

  ngOnInit(): void {
    // window.addEventListener('scroll', () => {
      
    //   var bgheader=document.getElementsByClassName('bgheader')as HTMLCollectionOf<HTMLElement>
    //   bgheader[0].style.backgroundColor="white"
    //   bgheader[0].style.boxShadow="0 0 10px"
       
    //   var navlink=document.getElementsByClassName('nav-link')as HTMLCollectionOf<HTMLElement>
    //   for(let i=0 ; i<navlink.length;i++)
    //   navlink[i].style.color="black"
    //   var double=document.getElementsByClassName('double') as HTMLCollectionOf<HTMLElement>
    //   double[0].style.color="black"
    //   var active =document.getElementsByClassName('nav-item active ng-star-inserted nav-link') as HTMLCollectionOf<HTMLElement>
    //   active[0].style.color="#f33f3f"
    //   console.log(active[0]);
      
    // })
    let myIndex = 0
    this.productService.getAllVoucher().subscribe(res=>
      {
        this.allvoucher=res
        this.allvoucher=this.allvoucher.data
  
        if(this.allvoucher.length>0 )
        {
          if(this.allvoucher.length> 3) this.allvoucher=this.allvoucher.slice(0,3)
          carousel()
        }
        
       
        
      })

      


      
   

    function carousel() {
      
        
        var i;
        var x = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
     
        
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";
        }
        myIndex = myIndex + 1;
        if (myIndex > x.length) {
          myIndex = 1
  
        }
       
        if(x.length>0)
        {
          
        x[myIndex - 1].style.display = "block";
        localStorage.setItem("idVoucher",(myIndex-1).toString())
    
        
        }
      
    
      setTimeout(carousel, 4000); // Change image every 2 seconds
    }
   
    this.getLastestProduct()
    this.getAllCategory()

    if (localStorage.getItem("isLogin") == "true") {
      this.isLogin = true

    }

    this.signInService.isLogin.subscribe(res => {
      this.isLogin = true

    })


  }
  getAllCategory()
  {
    this.categoryService.getAllCategory().subscribe(res=>{
      this.allCate=res
      this.allCate=this.allCate.data
    })
  }
   copyCode()
  {
    
    
      var id=localStorage.getItem("idVoucher")
     
      
      var copyText = document.getElementById(id) as HTMLInputElement;
 
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices
    
      // Copy the text inside the text field
      navigator.clipboard.writeText(copyText.value);
      
      // Alert the copied text
      alert("Copied the text: " + copyText.value);
    
  }
  getLastestProduct() {
    this.productService.getLastestProduct().subscribe(res => {
      this.dataSource = res
      this.dataSource = this.dataSource.data
      this.isLoading = false

    })
  }
  goDetailProductPage(id)
  {
     this.router.navigate(['product-detail/'+ id])
  }
  goProductPage(id)
  {
    this.router.navigate(['products'], { queryParams: { categoryId: id } })
  }
  getVoucher()
  {
    this.productService.getAllVoucher().subscribe(res=>
      {
        this.allvoucher=res
        this.allvoucher=this.allvoucher.data
         
        
        
       
        
      })
  }
  addToCart(id: any) {
    if (localStorage.getItem("isLogin") == "true") {
      // this.router.navigate(['product-detail/'+ id])
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
}
