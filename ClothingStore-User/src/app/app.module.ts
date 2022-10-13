import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './component/profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeAddressComponent } from './component/checkout/change-address/change-address.component';
import { UpdateAddressComponent } from './component/checkout/change-address/update-address/update-address.component';


import { registerLocaleData } from '@angular/common';
import hi from '@angular/common/locales/hi';

import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion'
import { ChangePaymentMethodComponent } from './component/checkout/change-payment-method/change-payment-method.component';
 import { FabCallChatComponent } from './component/fab-call-chat/fab-call-chat.component';
import { OrdersComponent } from './component/orders/orders.component';
import { NavigationBarComponent } from './component/navigation-bar/navigation-bar.component';
import { ChatBoxComponent } from './component/chat-box/chat-box.component';
import { NotificationComponent } from './component/notification/notification.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddAddressComponent } from './component/checkout/add-address/add-address.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { ChangeAvatarComponent } from './component/profile/change-avatar/change-avatar.component';
import { ConfirmCheckoutComponent } from './component/checkout/confirm-checkout/confirm-checkout.component';
  
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
    HomeComponent,
    ProductsComponent,
    AboutUsComponent,
    ContactUsComponent,
    SignInComponent,
    SignUpComponent,
    ShoppingCartComponent,
    ProfileComponent,
    ProductDetailComponent,
    CheckoutComponent,
    ChangeAddressComponent,
    UpdateAddressComponent,
    ChangePaymentMethodComponent,
     FabCallChatComponent,
    OrdersComponent,
    NavigationBarComponent,
    ChatBoxComponent,
    NotificationComponent,
    AddAddressComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ChangeAvatarComponent,
    ConfirmCheckoutComponent,
     

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule, FormsModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule, 
    MatSelectModule,
 
    ReactiveFormsModule, NgxPaginationModule,
   
  ],
  providers: [CheckoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
