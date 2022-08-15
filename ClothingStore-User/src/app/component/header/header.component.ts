import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() active = "";
  ngOnInit(): void {

  }
  goProductPage() {
    this.router.navigate(['products'])
  }
  goHomePage() {
    this.router.navigate(['home'])
  }
  goAboutUsPage() {
    this.router.navigate(['about-us'])
  }
  goContactUsPage() {
    this.router.navigate(['contact-us'])
  }
  goSignInPage() {
    this.router.navigate(['sign-in'])
  }
  goSignUpPage() {
    this.router.navigate(['sign-up'])
  }

}
