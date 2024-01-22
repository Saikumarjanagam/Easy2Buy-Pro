import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BuynowItem } from 'src/models/buynow-item.model';
import { Order } from 'src/models/order.model';
import { Product } from 'src/models/product.model';
import { ShippingModel } from 'src/models/shipping.model';
import { ShoppingCartItem } from 'src/models/shopping-cart-item';
import { ShippingService } from 'src/services/shipping.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  // cartItems = new ShoppingCartItem()
  _cartItems: ShoppingCartItem[] = [];
  shipping = new ShippingModel();
  //product = new Product();
  buyNowItem = new BuynowItem()
  constructor(private _cartService: ShoppingCartService, private router: Router, private _shippingService: ShippingService, private toastr: ToastrService) { }

  ngOnInit() {
    this._cartItems = this._cartService.CartItems;
  }
  get totalPrice() {
    return this._cartService.CartItemsTotal;
  }
  get totalItemsCount() {
    return this._cartService.CartItemsCount;
  }
  placeOrder() {
    //this.product = new Product();
    let order = new Order();
    order.datePlaced = new Date().getTime();
    order.amount = this._cartService.CartItemsTotal;
    order.userId = localStorage.getItem('loggedInUserId')!;
    order.items = this._cartItems;
    //order.buyItems = this.product;
    order.shippingDetails = {
      name: this.shipping.name,
      mobile: this.shipping.mobile,
      addressLine1: this.shipping.addressLine1,
      addressLine2: this.shipping.addressLine2,
      city: this.shipping.city,
      pincode: this.shipping.pincode
    };

    this._shippingService.create(order)
      .then((response) => {
        this._cartService.clearCartItems();
        this.toastr.success('Order placed successfully...!');
        this.router.navigate(['/order-success']);
      })
      .catch((error: any) => {
        this.toastr.error('Un-handled exception occured...!');
      });
  }

}

