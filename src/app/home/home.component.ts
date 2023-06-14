import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/models/category.model';
import { Product } from 'src/models/product.model';
import { ShoppingCartItem } from 'src/models/shopping-cart-item';
import { categoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _productService: ProductService, private _categoryService: categoryService, private router: Router, private _cartService: ShoppingCartService, private _userService: UserService) {

  }
  products: Product[] = [];
  product = new Product();
  categories: Category[] = [];
  selectedCategory: string = '';
  searchTerm: string;
  // notFounf: boolean = false;
  // notFound = this.loadProducts.length >= 0 == true;

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }
  loadProducts() {
    this._productService.read(this.searchTerm, this.selectedCategory)
      .subscribe(response => {
        this.products = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as Product
          }
        });
        // console.log(this.products)
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

  changeCategory($event: any) {
    if ($event.target.selectedIndex > 0)
      this.selectedCategory = this.categories[$event.target.selectedIndex - 1].name!;
    else
      this.selectedCategory = '';
    this.loadProducts();
  }
  addToCart(_product: Product) {
    let _cartItem = _product as unknown as ShoppingCartItem;
    _cartItem.quantity = 1;
    _cartItem.totalPrice = _cartItem.quantity * _cartItem.price;
    this._cartService.addItemToCart(_cartItem);
  }
  buyNow(_product: Product) {
    let _cartItem = _product as unknown as ShoppingCartItem;
    _cartItem.quantity = 1;
    _cartItem.totalPrice = _cartItem.quantity * _cartItem.price;
    this._cartService.buyNow(_cartItem);
    if (this._userService.firstName) {
      this.router.navigate(['/shipping-order'])
    }
    else {
      this.router.navigate(['/login'])
    }
    this._cartService.checkOut = true;
  }
  removeFromCart(_product: Product) {
    let _cartItem = _product as unknown as ShoppingCartItem;
    _cartItem.quantity = -1;
    this._cartService.removeItemFromCart(_cartItem);
  }
  getQuantity(_product: Product) {
    let _itemQty: number = 0;
    this._cartService.CartItems.filter(item => item.id === _product.id).forEach(_item => { _itemQty += _item.quantity })
    return _itemQty;
  }

}
