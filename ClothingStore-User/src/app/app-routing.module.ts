import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ConfirmCheckoutComponent } from './component/checkout/confirm-checkout/confirm-checkout.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { HomeComponent } from './component/home/home.component';
import { NotificationComponent } from './component/notification/notification.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ProductsComponent } from './component/products/products.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'product-detail/:id', component: ProductDetailComponent },
      { path: 'checkout/:id', component: CheckoutComponent },
      { path: 'checkout', component: ConfirmCheckoutComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-email', component: VerifyEmailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
