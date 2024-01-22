import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.development';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { categoryService } from 'src/services/category.service';
import { UsersComponent } from './users/users.component';
import { ProductService } from 'src/services/product.service';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShippingComponent } from './shipping/shipping.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ShippingService } from 'src/services/shipping.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnAuthComponent } from './un-auth/un-auth.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { BuyItemsComponent } from './buy-items/buy-items.component';
import { AboutComponent } from './about/about.component';

const route: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'category', component: CategoryComponent, canActivate: [AdminGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AdminGuard] },
  { path: 'add-produt', component: AddProductComponent, canActivate: [AdminGuard] },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'shipping-order', component: ShippingComponent, canActivate: [AuthGuard] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: 'admin-orders', component: AdminOrdersComponent, canActivate: [AdminGuard] },
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AdminGuard] },
  { path: 'view-product/:id', component: ViewProductComponent },
  { path: 'buy-item/:id', component: BuyItemsComponent },
  { path: 'un-auth', component: UnAuthComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CategoryComponent,
    UsersComponent,
    ProductsComponent,
    AddProductComponent,
    HomeComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    ShippingComponent,
    OrderSuccessComponent,
    OrderDetailsComponent,
    AdminOrdersComponent,
    EditProductComponent,
    ViewProductComponent,
    NotFoundComponent,
    UnAuthComponent,
    BuyItemsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    RouterModule.forRoot(route),
  ],
  providers: [UserService, categoryService, ProductService, ShoppingCartService, ShippingService, AdminGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
