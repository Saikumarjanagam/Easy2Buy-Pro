import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BuynowItem } from 'src/models/buynow-item.model';
import { Category } from 'src/models/category.model';
import { Order } from 'src/models/order.model';
import { Product } from 'src/models/product.model';
import { ShippingModel } from 'src/models/shipping.model';
import { ShoppingCartItem } from 'src/models/shopping-cart-item';
import { categoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { ShippingService } from 'src/services/shipping.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@Component({
  selector: 'buy-items',
  templateUrl: './buy-items.component.html',
  styleUrls: ['./buy-items.component.css']
})
export class BuyItemsComponent implements OnInit {
  constructor(private _productService: ProductService, private toastr: ToastrService, private router: ActivatedRoute, private _categoryService: categoryService, private _cartService: ShoppingCartService, private _shippingService: ShippingService, private _Rout: Router) { }
  // _cartItems: ShoppingCartItem[] = [];
  _buyItems: BuynowItem[] = [];
  shipping = new ShippingModel();
  product = new Product();
  productId: string;
  categories: Category[] = [];
  category = new Category();

  ngOnInit(): void {
    this.loadProducts(),
      this.loadCategories()
  }
  get totalPrice() {
    return this._cartService.BuyItemsTotal;
  }
  get totalItemsCount() {
    return this._cartService.BuyItemsCount;
  }
  get buyItemTotal() {
    return this.totalItemsCount * this.product.price
  }

  addItem() {
    this._cartService.addBuyItems()
  }
  minusItem() {
    this._cartService.removeBuyItems()
  }

  loadProducts() {
    let id = this.router.snapshot.paramMap.get('id');
    this.productId = id ? id : '';

    this._productService.getById(this.productId).subscribe((response) => {
      this.product = response as unknown as Product
    })
  }
  loadCategories() {
    this._categoryService.read()
      .subscribe(response => {
        this.categories = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as Category
          }
        });
      })
  }
  placeOrder() {
    let order = new Order();
    order.datePlaced = new Date().getTime();
    order.amount = this.buyItemTotal
    order.userId = localStorage.getItem('loggedInUserId')!;
    order.buyItems = this._buyItems;
    order.shippingDetails = {
      name: this.shipping.name,
      addressLine1: this.shipping.addressLine1,
      addressLine2: this.shipping.addressLine2,
      city: this.shipping.city,
      pincode: this.shipping.pincode
    };

    this._shippingService.create(order)
      .then((response) => {
        this._cartService.clearBuyItems();
        this.toastr.success('Order placed successfully...!');
        this._Rout.navigate(['/order-success']);
      })
      .catch((error: any) => {
        this.toastr.error('Un-handled exception occured...!');
      });
  }
}
